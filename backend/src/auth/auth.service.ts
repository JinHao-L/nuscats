import { JwtConfigService } from './../config/jwt.config';
import { TokenPayload } from './interface/token-payload.interface';
import { User } from './../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { map, mergeMap, Observable, from } from 'rxjs';

import { UserPrincipal } from './interface/user-principal.interface';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  /**
   * Check login using username and password
   */
  validateLogin(username: string, pass: string): Observable<UserPrincipal> {
    return this.usersService.findByUsername(username).pipe(
      // check password
      mergeMap((user) => {
        if (user && user.password_hash) {
          return from(bcrypt.compare(pass, user.password_hash)).pipe(
            map((isMatch) => {
              if (isMatch) {
                const userObj: UserPrincipal = {
                  uuid: user.uuid,
                  username: user.username,
                  email: user.email,
                  roles: user.roles,
                };
                return userObj;
              } else {
                // password does not match
                throw new UnauthorizedException('Wrong username or password');
              }
            }),
          );
        }
        // username not found
        throw new UnauthorizedException('Wrong username or password');
      }),
    );
  }

  getJwtAccessTokenCookie(user: UserPrincipal) {
    const payload: TokenPayload = {
      username: user.username,
      sub: user.uuid,
    };
    const jwtOptions = this.jwtConfigService.accessTokenOptions;
    const token = this.jwtService.sign(payload, {
      secret: jwtOptions.secret,
      expiresIn: `${jwtOptions.expiry}s`,
    });
    const cookie = `tkn=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${jwtOptions.expiry}`;
    return { cookie, token };
  }

  getJwtRefreshTokenCookie(user: UserPrincipal) {
    const payload: TokenPayload = {
      username: user.username,
      sub: user.uuid,
    };
    const refreshOptions = this.jwtConfigService.refreshTokenOptions;
    const token = this.jwtService.sign(payload, {
      secret: refreshOptions.secret,
      expiresIn: `${refreshOptions.expiry}s`,
    });
    const cookie = `ref=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${refreshOptions.expiry}`;

    return { cookie, token };
  }

  getLogoutCookies() {
    const unsetRefreshCookie = `ref=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
    const unsetAccessCookie = `tkn=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
    return [unsetRefreshCookie, unsetAccessCookie];
  }

  saveRefreshToken(
    refreshToken: string,
    user: UserPrincipal,
  ): Observable<boolean> {
    return from(bcrypt.hash(refreshToken, 12)).pipe(
      mergeMap((hashedToken) =>
        this.usersService.setRefreshToken(hashedToken, user.uuid),
      ),
    );
  }

  deleteRefreshToken(user: UserPrincipal): Observable<boolean> {
    return this.usersService.removeRefreshToken(user.uuid);
  }

  login(user: UserPrincipal): { username: string; token: string } {
    const payload = {
      username: user.username,
      sub: user.uuid,
    };
    const jwtOptions = this.jwtConfigService.accessTokenOptions;
    return {
      username: user.username,
      token: this.jwtService.sign(payload, {
        secret: jwtOptions.secret,
        expiresIn: `${jwtOptions.expiry}s`,
      }),
    };
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
              } as User);
            }),
          );
        }
      }),
    );
  }
}
