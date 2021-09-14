import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPrincipal } from './../auth/interface/user-principal.interface';
import { Profile } from './profile.entity';
import { from, mergeMap, Observable } from 'rxjs';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(
    createProfileDto: CreateProfileDto,
    user: UserPrincipal,
  ): Observable<Profile> {
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: user.uuid,
    });
    return from(this.profileRepository.save(profile));
  }

  findAll(): Observable<Profile[]> {
    return from(this.profileRepository.find());
  }

  findOne(uuid: string): Observable<Profile> {
    return from(
      this.profileRepository.findOne({ user: uuid }, { relations: ['user'] }),
    );
  }

  update(
    uuid: string,
    updateProfileDto: UpdateProfileDto,
  ): Observable<Profile> {
    return from(
      this.profileRepository.update({ user: uuid }, { ...updateProfileDto }),
    ).pipe(mergeMap(() => this.findOne(uuid)));
  }

  remove(uuid: string) {
    return this.findOne(uuid).pipe(
      mergeMap((profile) => this.profileRepository.remove(profile)),
    );
  }
}
