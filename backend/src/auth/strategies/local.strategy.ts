import { UserPrincipal } from './../interface/user-principal.interface';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserPrincipal> {
    const user: UserPrincipal = await lastValueFrom(
      this.authService.validateLogin(username, password),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
