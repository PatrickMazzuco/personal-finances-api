import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class UserDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
