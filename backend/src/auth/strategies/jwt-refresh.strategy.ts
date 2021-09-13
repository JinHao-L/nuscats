import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/users.service';
import {
  getUserPrincipal,
  UserPrincipal,
} from '../interface/user-principal.interface';
import { JwtConfigService } from './../../config/jwt.config';
import { TokenPayload } from '../interface/token-payload.interface';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private usersService: UsersService,
    private jwtConfigService: JwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.ref;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.refreshTokenOptions.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload): Promise<UserPrincipal> {
    const { sub, username } = payload;
    const refreshToken = req.cookies?.ref;
    const user = await lastValueFrom(this.usersService.findByUuid(sub));

    const isTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refresh_token_hash,
    );
    // additional check
    if (!isTokenMatch || user?.username != username) {
      throw new UnauthorizedException();
    }

    return getUserPrincipal(user);
  }
}
