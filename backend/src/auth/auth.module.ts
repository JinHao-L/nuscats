import { MailModule } from './../mail/mail.module';
import { JwtConfigService } from './../config/jwt.config';
import { AppConfigModule } from 'src/config/config.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AppConfigService } from 'src/config/app.config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    AppConfigModule,
    MailModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtConfigService,
    AppConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
