import { ChangePasswordDto } from './dtos/change-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { Response } from 'express';
import { map, Observable, mergeMap } from 'rxjs';
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
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from '../users/user.entity';
import { Usr } from '../shared/decorators/user.decorator';
import ForgetPasswordDto from 'src/auth/dtos/forget-password.dto';
import ResendConfirmationDto from './dtos/resend-confirmation.dto';
import ChangeUsernameDto from './dtos/change-username.dto';

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
    return this.authService.signup(createUserDto).pipe(
      mergeMap((user) =>
        this.authService.sendEmailConfirmation(user.email).pipe(
          map(() => {
            console.log('Verification email sent');
            return user;
          }),
        ),
      ),
    );
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
  @Post('/refresh')
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
  @Post('/logout')
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

  //============ Email Confirmation endpoint ===============

  /**
   * Request email confirmation mail
   */
  @ApiCreatedResponse({ description: 'Confirmation request sent to email' })
  @Post('/resend-confirm')
  resendConfirmationEmail(
    @Body() resendConfirmDto: ResendConfirmationDto,
  ): Observable<string> {
    return this.authService.sendEmailConfirmation(resendConfirmDto.email).pipe(
      map(() => {
        return 'Email sent! Check your mailbox for confirmation email';
      }),
    );
  }

  /**
   * Validate user's email confirmation request
   */
  @ApiCreatedResponse({ description: 'Email confirmed' })
  @Post('/confirm')
  confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto): Observable<string> {
    return this.authService.confirmEmail(confirmEmailDto);
  }

  // ============ Password related endpoint ===============

  /**
   * Request password reset email
   */
  @ApiCreatedResponse({ description: 'Reset request sent to email' })
  @Post('/forget-password')
  requestPasswordResetEmail(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Observable<string> {
    return this.authService.sendPasswordResetUrl(forgetPasswordDto.email).pipe(
      map(() => {
        return 'Email sent! Check your mailbox for password reset email';
      }),
    );
  }

  /**
   * Validate user's password reset request
   */
  @ApiCreatedResponse({ description: 'Password successfully reseted' })
  @Post('/password-reset')
  confirmPasswordReset(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Observable<string> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  /**
   * Request to Change password
   */
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Password changed' })
  @Post('/change-password')
  changePassword(
    @Usr() requester: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Observable<string> {
    return this.authService.changePassword(requester, changePasswordDto);
  }

  /**
   * Request to Change password
   */
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Username changed' })
  @ApiConflictResponse({ description: 'Username already exists' })
  @Post('/change-username')
  changeUsername(
    @Usr() requester: User,
    @Body() changeUsernameDto: ChangeUsernameDto,
  ): Observable<string> {
    return this.authService.changeUsername(requester, changeUsernameDto);
  }
}
