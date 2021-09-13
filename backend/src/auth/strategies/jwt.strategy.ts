import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import {
  getUserPrincipal,
  UserPrincipal,
} from './../interface/user-principal.interface';
import { JwtConfigService } from './../../config/jwt.config';
import { TokenPayload } from './../interface/token-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private jwtConfigService: JwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.tkn;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.accessTokenOptions.secret,
    });
  }

  async validate(payload: TokenPayload): Promise<UserPrincipal> {
    const { sub, username } = payload;
    const user = await lastValueFrom(this.usersService.findByUuid(sub));

    // additional check
    if (!user || user.username != username) {
      throw new UnauthorizedException();
    }

    return getUserPrincipal(user);
  }
}
