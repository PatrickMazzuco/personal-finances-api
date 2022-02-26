import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { UserDTO } from '@modules/users/dtos/user.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UpdateUserBodyDTO } from './dtos/update-user-body.dto';
import { UpdateUserParamsDTO } from './dtos/update-user-params.dto';
import { UpdateUserService } from './update-user.service';

@Controller('users')
@ApiTags('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User created',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This email is already in use',
    type: HttpExceptionDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: HttpExceptionDTO,
  })
  async handle(
    @Param() params: UpdateUserParamsDTO,
    @Body() data: UpdateUserBodyDTO,
  ): Promise<void> {
    await this.updateUserService.execute({
      ...params,
      ...data,
    });
  }
}
