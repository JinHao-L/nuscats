import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUpsert } from '@nest-toolbox/typeorm-upsert';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleType } from '@api/users';

import { Profile } from 'src/profiles/profile.entity';
import { User } from 'src/users/user.entity';
import { ISeeder } from '../seeder.interface';

@Injectable()
export class UsersSeeder implements ISeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  private async generateData(
    roles: RoleType[],
    subject: string,
  ): Promise<User> {
    return bcrypt.hash(subject, 12).then((password_hash) => {
      return this.userRepository.create({
        username: subject,
        password_hash,
        email: `${subject}@gmail.com`,
        is_email_confirmed: true,
        roles,
      });
    });
  }

  seed(): Promise<any> {
    const userPromises: Promise<User>[] = [];

    // Generate admin account.
    const adminPromise = this.generateData([RoleType.Admin], 'admin');
    userPromises.push(adminPromise);

    // generate 5 accounts with user privilege
    for (let i = 1; i <= 5; i++) {
      const subject = `user${i}`;
      userPromises.push(this.generateData([RoleType.User], subject));
    }

    return Promise.all(userPromises)
      .then((users) => {
        return TypeOrmUpsert(this.userRepository, users, 'email').finally(() =>
          console.log('* Seeded users...'),
        );
      })
      .then((users) => {
        const profiles: Profile[] = users.map((user) =>
          this.profileRepository.create({
            user: user,
            first_name: user.username,
            last_name: user.username,
            profile_pic:
              Math.random() < 0.5 ? 'https://i.pravatar.cc/300' : null,
          }),
        );

        return TypeOrmUpsert(this.profileRepository, profiles, 'uuid', {
          doNotUpsert: ['user'],
        }).finally(() => console.log('* Seeded profiles...'));
      });
  }

  drop(): Promise<any> {
    console.log('> Dropping user');
    return this.userRepository.delete({});
  }
}
