import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { UserDTO } from '@modules/users/dtos/user.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticateService } from './authenticate.service';
import { AuthenticationBodyDTO } from './dtos/authentication-body.dto';
import { AuthenticationResponseDTO } from './dtos/authentication-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthenticateController {
  constructor(private readonly authenticateUserService: AuthenticateService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully authenticated',
    type: UserDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email or password is invalid',
    type: HttpExceptionDTO,
  })
  async handle(
    @Body() data: AuthenticationBodyDTO,
  ): Promise<AuthenticationResponseDTO> {
    return this.authenticateUserService.execute(data);
  }
}
