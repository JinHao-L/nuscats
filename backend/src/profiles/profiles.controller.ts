import { catchError, EMPTY, map, mergeMap, Observable } from 'rxjs';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleType } from '@api/users';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../shared/decorators/role.decorator';
import { Usr } from './../shared/decorators/user.decorator';
import { Profile } from './profile.entity';
import { User } from '../users/user.entity';

@ApiTags('Profiles')
@ApiUnauthorizedResponse({ description: 'User not logged in' })
@UseGuards(JwtAuthGuard)
@Controller('users')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  /**
   * Create a new user profile
   */
  @ApiCreatedResponse({
    description: 'Profile successfully created',
    type: Profile,
  })
  @ApiConflictResponse({ description: 'Profile already exists' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Usr() requester: User,
    @Body() createProfileDto: CreateProfileDto,
  ): Observable<Profile> {
    return this.profilesService.create(createProfileDto, requester);
  }

  /**
   * Gets a list of profile
   */
  @ApiOkResponse({
    description: 'Successfully get list of profiles',
    type: [Profile],
  })
  @Get()
  findAll(): Observable<Profile[]> {
    return this.profilesService.findAll();
  }

  /**
   * Gets a user profile by uuid
   */
  @ApiOkResponse({
    description: 'Successfully get requested profile',
    type: Profile,
  })
  @ApiParam({ name: 'uuid', description: 'The id of the profile to query' })
  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string): Observable<Profile> {
    return this.profilesService.findOne(uuid).pipe(
      catchError(() => EMPTY),
      mergeMap(async (val) => {
        if (val) {
          return val;
        } else {
          throw new NotFoundException('User not found');
        }
      }),
    );
  }

  /**
   * Updates a user profile
   */
  @ApiOkResponse({
    description: 'Successfully updated requested profile',
    type: Profile,
  })
  @ApiParam({ name: 'uuid', description: 'The id of the profile to update' })
  @UseGuards(JwtAuthGuard)
  @Put(':uuid')
  update(
    @Usr() requester: User,
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Observable<Profile> {
    return this.profilesService.update(uuid, updateProfileDto, requester);
  }

  /**
   * Deletes a user profile
   */
  @ApiOkResponse({
    description: 'Successfully deleted requested profile',
    type: Profile,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. Operation allowed only for admin',
  })
  @ApiParam({ name: 'uuid', description: 'The id of the profile to delete' })
  @UseGuards(RolesGuard)
  @Roles(RoleType.Admin)
  @Delete(':uuid')
  remove(@Param('uuid', ParseUUIDPipe) uuid: string): Observable<string> {
    return this.profilesService
      .remove(uuid)
      .pipe(map(() => 'Deleted successfully'));
  }
}
