import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UserPrincipal } from './interface/user-principal.interface';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { map, Observable } from 'rxjs';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import {
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: LoginUserDto,
  })
  @ApiCreatedResponse({
    description: 'Successfully logged in',
    type: UserPrincipal,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid username or password' })
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

  @ApiCreatedResponse({
    description: 'Successfully created. Proceed to login',
    type: UserPrincipal,
  })
  @ApiBadRequestResponse({
    description: 'Missing or invalid registration details',
  })
  @ApiConflictResponse({ description: 'Username or email already exists' })
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Observable<UserPrincipal> {
    return this.authService.signup(createUserDto);
  }

  @ApiOkResponse({
    description: 'Successfully refreshed access token',
    type: UserPrincipal,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(@Req() request: Request): UserPrincipal {
    const user = request.user as UserPrincipal;
    const accessTokenCookie = this.authService.getJwtAccessTokenCookie(user);

    request.res.setHeader('Set-Cookie', accessTokenCookie.cookie);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'Not logged in' })
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
