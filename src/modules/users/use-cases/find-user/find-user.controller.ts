import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { UserDTO } from '@modules/users/dtos/user.dto';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FindUserDTO } from './dtos/find-user.dto';
import { FindUserService } from './find-user.service';

@Controller('users')
@ApiTags('users')
export class FindUserController {
  constructor(private readonly findUserService: FindUserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: HttpExceptionDTO,
  })
  async handle(@Param() data: FindUserDTO): Promise<UserDTO> {
    return this.findUserService.execute(data);
  }
}
