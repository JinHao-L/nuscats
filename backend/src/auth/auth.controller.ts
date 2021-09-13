import { JwtAuthGuard } from './guard/jwt-auth.guard';
import {
  getUserPrincipal,
  UserPrincipal,
} from './interface/user-principal.interface';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { map, Observable } from 'rxjs';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post('/login')
  login(@Req() req: Request): Observable<UserPrincipal> {
    const user = req.user as UserPrincipal;

    const accessTokenCookie = this.authService.getJwtAccessTokenCookie(user);
    const refreshTokenCookie = this.authService.getJwtRefreshTokenCookie(user);

    return this.authService
      .saveRefreshToken(refreshTokenCookie.token, user)
      .pipe(
        map((status) => {
          if (status) {
            req.res.setHeader('Set-Cookie', [
              accessTokenCookie.cookie,
              refreshTokenCookie.cookie,
            ]);
          } else {
            // failed to save;
            req.res.setHeader('Set-Cookie', accessTokenCookie.cookie);
          }
          return user;
        }),
      );
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Observable<UserPrincipal> {
    return this.authService.signup(createUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@Req() request: Request): UserPrincipal {
    const user = request.user as UserPrincipal;
    const accessTokenCookie = this.authService.getJwtAccessTokenCookie(user);

    request.res.setHeader('Set-Cookie', accessTokenCookie.cookie);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Req() request: Request) {
    const user = request.user as UserPrincipal;
    const logoutCookies = this.authService.getLogoutCookies();
    return this.authService.deleteRefreshToken(user).pipe(
      map((status) => {
        request.res.setHeader('Set-Cookie', logoutCookies);
        return {
          status: status ? 'Success' : 'Failed',
          message: 'See you again!',
        };
      }),
    );
  }
}
