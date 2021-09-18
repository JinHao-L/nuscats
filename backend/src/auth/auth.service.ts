import { JwtConfigService } from './../config/jwt.config';
import { TokenPayload } from './interface/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { map, mergeMap, Observable, from } from 'rxjs';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { AppConfigService } from 'src/config/app.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * Check login using email and password
   */
  validateLogin(email: string, pass: string): Observable<User> {
    return this.usersService.findByEmail(email).pipe(
      // check password
      mergeMap((user) => {
        if (user && user.password_hash) {
          return from(bcrypt.compare(pass, user.password_hash)).pipe(
            map((isMatch) => {
              if (isMatch) {
                const userObj = {
                  uuid: user.uuid,
                  username: user.username,
                  email: user.email,
                  roles: user.roles,
                } as User;
                return userObj;
              } else {
                // password does not match
                throw new UnauthorizedException('Wrong email or password');
              }
            }),
          );
        }
        // username not found
        throw new UnauthorizedException('Wrong email or password');
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

  makeCookie({
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
}
