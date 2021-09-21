import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable, catchError, of, mergeMap, from } from 'rxjs';
import { Repository } from 'typeorm';

import { RoleType } from '@api/users';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Observable<User> {
    return from(
      this.userRepository.findOne({ username }, { relations: ['profile'] }),
    );
  }

  findByUuid(uuid: string): Observable<User> {
    return from(
      this.userRepository.findOne({ uuid }, { relations: ['profile'] }),
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({ email }, { relations: ['profile'] }),
    );
  }

  doesUsernameExist(username: string): Observable<boolean> {
    return from(
      this.userRepository.findOne({ username }).then((user) => !!user),
    );
  }

  doesEmailExist(email: string): Observable<boolean> {
    return from(this.userRepository.findOne({ email }).then((user) => !!user));
  }

  createUser(
    user: Pick<User, 'username' | 'email' | 'password_hash'>,
  ): Observable<User> {
    const newUser = this.userRepository.create({
      ...user,
      roles: [RoleType.User],
    });
    return from(this.userRepository.save(newUser));
  }

  setRefreshToken(
    hashedRefreshToken: string,
    uuid: string,
  ): Observable<boolean> {
    return from(
      this.userRepository.update(
        { uuid },
        { refresh_token_hash: hashedRefreshToken },
      ),
    ).pipe(
      map(() => {
        console.log('Add refresh token');
        return true;
      }),
      catchError((err) => {
        console.log('Error saving token', err);
        return of(false);
      }),
    );
  }

  removeRefreshToken(uuid: string): Observable<boolean> {
    return from(
      this.userRepository.update({ uuid }, { refresh_token_hash: null }),
    ).pipe(
      map(() => true),
      catchError((err) => {
        console.log('Error deleting token', err);
        return of(false);
      }),
    );
  }

  activateAccount(email: string): Observable<boolean> {
    console.log(123);
    return this.findByEmail(email).pipe(
      mergeMap((user) => {
        console.log(123);

        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (user.is_email_confirmed) {
          // already verified
          return of(false);
        }
        return this.userRepository
          .update({ uuid: user.uuid }, { is_email_confirmed: true })
          .then(() => true);
      }),
    );
  }

  setPassword(uuid: string, passwordHash: string): Observable<boolean> {
    return from(
      this.userRepository.update({ uuid }, { password_hash: passwordHash }),
    ).pipe(
      map(() => true),
      catchError((err) => {
        console.log('Error setting password', err);
        return of(false);
      }),
    );
  }
}
