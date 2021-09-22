import { ProfilesModule } from './../profiles/profiles.module';
import { User } from './user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
