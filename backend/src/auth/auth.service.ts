import { ChangeUsernameDto } from './dtos/change-username.dto';
import { MailService } from './../mail/mail.service';
import { PasswordResetPayload } from './interface/reset-payload.interface';
import { EmailConfirmPayload } from './interface/confirm-payload.interface';
import { JwtConfigService } from './../config/jwt.config';
import { TokenPayload } from './interface/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EMPTY, from, map, mergeMap, Observable, of } from 'rxjs';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { AppConfigService } from 'src/config/app.config';
import ConfirmEmailDto from './dtos/confirm-email.dto';
import ResetPasswordDto from './dtos/reset-password.dto';
import ChangePasswordDto from './dtos/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * Gets login user using email and password
   */
  validateLogin(email: string, pass: string): Observable<User> {
    return this.usersService.findByEmail(email).pipe(
      // check password
      mergeMap((user) => {
        if (user && user.password_hash) {
          return from(bcrypt.compare(pass, user.password_hash)).pipe(
            mergeMap((isMatch) => {
              if (isMatch) {
                return of(user);
              } else {
                // password does not match
                return EMPTY;
              }
            }),
          );
        }
        // username not found
        return EMPTY;
      }),
    );
  }

  getJwtAccessTokenCookie(user: User) {
    const payload: TokenPayload = {
      username: user.username,
      sub: user.uuid,
    };
    const jwtOptions = this.jwtConfigService.accessTokenOptions;
    const token = this.jwtService.sign(payload, {
      secret: jwtOptions.secret,
      expiresIn: `${jwtOptions.expiry}s`,
    });

    const cookie = this.makeCookie({
      name: 'tkn',
      value: token,
      httpOnly: true,
      sameSite: 'Strict',
      secure: this.appConfigService.isProd,
      path: '/',
      maxAge: jwtOptions.expiry,
    });
    return { cookie, token };
  }

  getJwtRefreshTokenCookie(user: User) {
    const payload: TokenPayload = {
      username: user.username,
      sub: user.uuid,
    };
    const refreshOptions = this.jwtConfigService.refreshTokenOptions;
    const token = this.jwtService.sign(payload, {
      secret: refreshOptions.secret,
      expiresIn: `${refreshOptions.expiry}s`,
    });

    const cookie = this.makeCookie({
      name: 'ref',
      value: token,
      httpOnly: true,
      sameSite: 'Strict',
      secure: this.appConfigService.isProd,
      path: '/',
      maxAge: refreshOptions.expiry,
    });

    return { cookie, token };
  }

  getLogoutCookies() {
    const unsetRefreshCookie = this.makeCookie({
      name: 'ref',
      value: '',
      httpOnly: true,
      sameSite: 'Strict',
      secure: this.appConfigService.isProd,
      path: '/',
      maxAge: '0',
    });

    const unsetAccessCookie = this.makeCookie({
      name: 'tkn',
      value: '',
      httpOnly: true,
      sameSite: 'Strict',
      secure: this.appConfigService.isProd,
      path: '/',
      maxAge: '0',
    });
    return [unsetRefreshCookie, unsetAccessCookie];
  }

  saveRefreshToken(refreshToken: string, user: User): Observable<boolean> {
    return from(bcrypt.hash(refreshToken, 12)).pipe(
      mergeMap((hashedToken) =>
        this.usersService.setRefreshToken(hashedToken, user.uuid),
      ),
    );
  }

  deleteRefreshToken(user: User): Observable<boolean> {
    return this.usersService.removeRefreshToken(user.uuid);
  }

  signup(createUserDto: CreateUserDto): Observable<User> {
    return this.usersService.doesUsernameExist(createUserDto.username).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException('Username already exists');
        } else {
          return this.usersService.doesEmailExist(createUserDto.email);
        }
      }),
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException('Email already exists');
        } else {
          // remove password field
          const { password, ...userDetails } = createUserDto;
          return from(bcrypt.hash(password, 12)).pipe(
            mergeMap((password_hash) => {
              return this.usersService.createUser({
                ...userDetails,
                password_hash,
              });
            }),
          );
        }
      }),
    );
  }

  private makeCookie({
    name,
    value,
    httpOnly,
    sameSite,
    secure,
    path,
    maxAge,
  }: {
    name: string;
    value: string;
    httpOnly?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
    secure?: boolean;
    path?: string;
    maxAge?: string;
  }): string {
    const kvPairs: (string | null)[] = [
      `${name}=${value}`,
      httpOnly ? 'HttpOnly' : null,
      sameSite ? `SameSite=${sameSite}` : null,
      secure ? 'Secure' : null,
      path ? `Path=${path}` : null,
      maxAge ? `Max-Age=${maxAge}` : null,
    ];

    return kvPairs.filter((pair) => pair != null).join('; ');
  }

  sendEmailConfirmation(email: string): Observable<boolean> {
    return this.usersService.findByEmail(email).pipe(
      map((user) => {
        if (!user) {
          throw new BadRequestException('Email does not exist');
        }

        const payload: EmailConfirmPayload = {
          sub: user.uuid,
          email: user.email,
          type: 'confirm',
        };
        const mailOptions = this.jwtConfigService.mailVerifyTokenOptions;
        const token = this.jwtService.sign(payload, {
          secret: mailOptions.secret,
          expiresIn: `${mailOptions.expiry}s`,
        });

        return {
          user,
          url: `${this.appConfigService.clientUrl}/confirm-email?token=${token}`,
        };
      }),
      mergeMap(({ user, url }) =>
        this.mailService.sendEmailConfirmation(user, url),
      ),
    );
  }

  sendPasswordResetUrl(email: string): Observable<boolean> {
    return this.usersService.findByEmail(email).pipe(
      map((user) => {
        if (!user) {
          throw new BadRequestException('Email does not exist');
        }

        const payload: PasswordResetPayload = {
          sub: user.uuid,
          hash: user.password_hash,
          type: 'reset',
        };
        const mailOptions = this.jwtConfigService.passwordResetTokenOptions;
        const token = this.jwtService.sign(payload, {
          secret: mailOptions.secret,
          expiresIn: `${mailOptions.expiry}s`,
        });

        return {
          user,
          url: `${this.appConfigService.clientUrl}/password-reset?token=${token}`,
        };
      }),
      mergeMap(({ user, url }) =>
        this.mailService.sendPasswordReset(user, url),
      ),
    );
  }

  confirmEmail(confirmEmailDto: ConfirmEmailDto): Observable<string> {
    try {
      const { token } = confirmEmailDto;
      let payload: EmailConfirmPayload;
      try {
        payload = this.jwtService.verify<EmailConfirmPayload>(token, {
          ignoreExpiration: false,
          secret: this.jwtConfigService.mailVerifyTokenOptions.secret,
        });
      } catch (error) {
        throw new BadRequestException('Invalid token');
      }

      const { email } = payload;
      return this.usersService.activateAccount(email).pipe(
        map((activated) => {
          if (!activated) {
            return 'Email already verified. Proceed to login.';
          } else {
            return 'Email successfully verified. Proceed to login.';
          }
        }),
      );
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }

  resetPassword(resetPasswordDto: ResetPasswordDto): Observable<string> {
    const { token, password } = resetPasswordDto;
    let payload: PasswordResetPayload;

    try {
      payload = this.jwtService.verify<PasswordResetPayload>(token, {
        ignoreExpiration: false,
        secret: this.jwtConfigService.passwordResetTokenOptions.secret,
      });
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }

    const { sub, hash: previousHash } = payload;
    return this.usersService.findByUuid(sub).pipe(
      map((user) => {
        if (previousHash !== user.password_hash) {
          // invalid password hash in jwt token
          throw new UnauthorizedException();
        }
        return user;
      }),
      mergeMap(() => bcrypt.hash(password, 12)),
      mergeMap((newPasswordHash) =>
        this.usersService.setPassword(sub, newPasswordHash),
      ),
      map((changed) => {
        if (!changed) {
          throw new BadRequestException(
            'Password reset failed. Please try again',
          );
        } else {
          return 'Password successfully resetted. Proceed to login.';
        }
      }),
    );
  }

  changePassword(
    requester: User,
    changePasswordDto: ChangePasswordDto,
  ): Observable<string> {
    const { newPassword, oldPassword } = changePasswordDto;

    return from(bcrypt.compare(oldPassword, requester.password_hash)).pipe(
      mergeMap((match) => {
        if (!match) {
          throw new BadRequestException('Incorrect password');
        } else {
          return bcrypt.hash(newPassword, 12);
        }
      }),
      mergeMap((newPasswordHash) => {
        return this.usersService.setPassword(requester.uuid, newPasswordHash);
      }),
      map((changed) => {
        if (!changed) {
          throw new BadRequestException(
            'Password change failed. Please try again',
          );
        } else {
          return 'Password successfully changed';
        }
      }),
    );
  }

  changeUsername(
    requester: User,
    changeUsernameDto: ChangeUsernameDto,
  ): Observable<string> {
    const { username } = changeUsernameDto;
    if (username === requester.username) {
      return of('Username successfully changed');
    }

    return this.usersService.doesUsernameExist(username).pipe(
      map((userExists) => {
        if (userExists) {
          throw new ConflictException('Username already exists');
        }
      }),
      mergeMap(() => this.usersService.setUsername(requester.uuid, username)),
      map((success) => {
        if (success) {
          return 'Username successfully changed';
        } else {
          throw new BadRequestException(
            'Failed to change username. Please try again.',
          );
        }
      }),
    );
  }
}
