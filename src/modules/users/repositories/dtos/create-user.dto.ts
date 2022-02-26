import { UserDTO } from '@modules/users/dtos/user.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDTO extends OmitType(UserDTO, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
