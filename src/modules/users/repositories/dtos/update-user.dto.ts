import { IsNotEmpty } from 'class-validator';

import { UserDTO } from '@modules/users/dtos/user.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

class UpdateUserFields extends OmitType(UserDTO, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UpdateUserDTO extends PartialType(UpdateUserFields) {}
