import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { lastValueFrom, throwIfEmpty } from 'rxjs';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      usernameQueryFields: ['email'],
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await lastValueFrom(
      this.authService
        .validateLogin(email, password)
        .pipe(
          throwIfEmpty(
            () =>
              new UnauthorizedException(
                'Wrong email or password. Please try again.',
              ),
          ),
        ),
    );
    // if (!user) {
    //   throw new UnauthorizedException(
    //     'Wrong email or password. Please try again.',
    //   );
    // }
    if (!user.is_email_confirmed) {
      throw new UnauthorizedException('Email not verified');
    }
    return user;
  }
}
