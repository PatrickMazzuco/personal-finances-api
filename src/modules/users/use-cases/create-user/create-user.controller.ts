import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { UserDTO } from '@modules/users/dtos/user.dto';
import { User } from '@modules/users/entities/user';
import { CreateUserDTO } from '@modules/users/use-cases/create-user/dtos/create-user.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserService } from './create-user.service';

@Controller('users')
@ApiTags('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This email is already in use',
    type: HttpExceptionDTO,
  })
  async handle(@Body() data: CreateUserDTO): Promise<User> {
    return this.createUserService.execute(data);
  }
}
