import { AuthErrors } from '@modules/auth/errors/auth.errors';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';
import { PasswordHash } from '@utils/security/password-hash';

import { AuthenticationBodyDTO } from './dtos/authentication-body.dto';
import { AuthenticationResponseDTO } from './dtos/authentication-response.dto';

export class AuthenticateService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticationBodyDTO): Promise<AuthenticationResponseDTO> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new AuthErrors.InvalidCredentials(this.logger);
    }

    const passwordMatches = await PasswordHash.compare(password, user.password);

    if (!passwordMatches) {
      throw new AuthErrors.InvalidCredentials(this.logger);
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return {
      accessToken,
    };
  }
}
