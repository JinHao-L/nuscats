import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { from, map, mergeMap, Observable } from 'rxjs';
import { User } from '@api/users';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto, user: User): Observable<Profile> {
    return from(this.profileRepository.findOne({ user: user })).pipe(
      map((existingProfile) => {
        if (existingProfile) {
          throw new ConflictException('Profile already exists');
        } else {
          return this.profileRepository.create({
            ...createProfileDto,
            user: user,
          });
        }
      }),
      mergeMap((profile) => this.profileRepository.save(profile)),
    );
  }

  findAll(): Observable<Profile[]> {
    return from(this.profileRepository.find());
  }

  findOne(uuid: string): Observable<Profile> {
    return from(
      this.profileRepository.findOne(
        { user: { uuid } },
        { relations: ['user'] },
      ),
    );
  }

  update(
    uuid: string,
    updateProfileDto: UpdateProfileDto,
  ): Observable<Profile> {
    return from(
      this.profileRepository.update(
        { user: { uuid } },
        { ...updateProfileDto },
      ),
    ).pipe(mergeMap(() => this.findOne(uuid)));
  }

  remove(uuid: string) {
    return this.findOne(uuid).pipe(
      mergeMap((profile) => this.profileRepository.remove(profile)),
    );
  }
}
