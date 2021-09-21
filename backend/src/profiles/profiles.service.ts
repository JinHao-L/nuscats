import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { from, map, mergeMap, Observable } from 'rxjs';
import { RoleType, User } from '@api/users';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(
    createProfileDto: CreateProfileDto,
    requester: User,
  ): Observable<Profile> {
    return from(this.profileRepository.findOne({ user: requester })).pipe(
      map((existingProfile) => {
        if (existingProfile) {
          throw new ConflictException('Profile already exists');
        } else {
          return this.profileRepository.create({
            ...createProfileDto,
            user: requester,
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
    requester: User,
  ): Observable<Profile> {
    if (requester.uuid !== uuid && !requester.roles.includes(RoleType.Admin)) {
      throw new UnauthorizedException('Cannot modify user');
    }

    return from(this.profileRepository.findOne({ user: { uuid } })).pipe(
      mergeMap((profile) => {
        if (!profile) {
          throw new NotFoundException('User does not exist');
        }
        return this.profileRepository.update(profile, updateProfileDto);
      }),
      mergeMap(() => this.findOne(uuid)),
    );
  }

  remove(uuid: string) {
    return this.findOne(uuid).pipe(
      mergeMap((profile) => this.profileRepository.remove(profile)),
    );
  }
}
