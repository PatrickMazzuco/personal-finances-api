import { IsNotEmpty } from 'class-validator';

import { UserDTO } from '@modules/users/dtos/user.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDTO extends OmitType(UserDTO, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
