import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  create(user: User): Observable<Profile> {
    const dicebearType = 'gridy';

    return from(this.profileRepository.findOne({ user: user })).pipe(
      map((existingProfile) => {
        if (existingProfile) {
          throw new ConflictException('Profile already exists');
        } else {
          return this.profileRepository.create({
            profile_pic: `https://avatars.dicebear.com/api/${dicebearType}/${user.uuid}.svg`,
            user: user,
            is_profile_setup: false,
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
    console.log(uuid, updateProfileDto, requester);
    return from(this.profileRepository.findOne({ uuid })).pipe(
      mergeMap((profile) => {
        if (!profile) {
          throw new NotFoundException('User does not exist');
        }
        console.log(profile);
        return this.profileRepository.update(
          { uuid: profile.uuid },
          {
            ...updateProfileDto,
            is_profile_setup: true,
          },
        );
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
