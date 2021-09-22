import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class ChangeUsernameDto extends PickType(CreateUserDto, ['username']) {}

export default ChangeUsernameDto;
