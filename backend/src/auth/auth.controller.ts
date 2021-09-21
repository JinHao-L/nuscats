import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { Body, Controller, Post, UseGuards, Get, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { User } from '../users/user.entity';
import { Usr } from '../shared/decorators/user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login to an account
   */
  @ApiCreatedResponse({
    description: 'Successfully logged in',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Wrong email or password' })
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LoginAuthGuard)
  @Post('/login')
  login(
    @Usr() user: User,
    @Res({ passthrough: true }) response: Response,
    // @Body() _loginUserDto: LoginUserDto,
  ): Observable<User> {
    const accessTokenCookie = this.authService.getJwtAccessTokenCookie(user);
    const refreshTokenCookie = this.authService.getJwtRefreshTokenCookie(user);

    return this.authService
      .saveRefreshToken(refreshTokenCookie.token, user)
      .pipe(
        map((status) => {
          if (status) {
            response.setHeader('Set-Cookie', [
              accessTokenCookie.cookie,
              refreshTokenCookie.cookie,
            ]);
          } else {
            // failed to save;
            response.setHeader('Set-Cookie', accessTokenCookie.cookie);
          }
          return user;
        }),
      );
  }

  /**
   * Create an account
   */
  @ApiCreatedResponse({
    description: 'Successfully created. Proceed to login',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Missing or invalid registration details',
  })
  @ApiConflictResponse({ description: 'Username or email already exists' })
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Observable<User> {
    return this.authService.signup(createUserDto);
  }

  /**
   * Request a new JWT access token
   */
  @ApiOkResponse({
    description: 'Successfully refreshed access token',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @UseGuards(JwtRefreshGuard)
  @Get('/refresh')
  refresh(
    @Usr() user: User,
    @Res({ passthrough: true }) response: Response,
  ): User {
    const accessTokenCookie = this.authService.getJwtAccessTokenCookie(user);

    response.setHeader('Set-Cookie', accessTokenCookie.cookie);
    return user;
  }

  /**
   * Logout of the account
   */
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'Not logged in' })
  @Get('/logout')
  logout(@Usr() user: User, @Res({ passthrough: true }) response: Response) {
    const logoutCookies = this.authService.getLogoutCookies();
    return this.authService.deleteRefreshToken(user).pipe(
      map((status) => {
        response.setHeader('Set-Cookie', logoutCookies);
        return {
          status: status ? 'Success' : 'Failed',
          message: 'See you again!',
        };
      }),
    );
  }
}
