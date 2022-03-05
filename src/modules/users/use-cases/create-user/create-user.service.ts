import { UserDTO } from '@modules/users/dtos/user.dto';
import { UserErrors } from '@modules/users/errors/user.errors';
import { IPasswordHash } from '@modules/users/providers/password-hash.provider';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { CreateUserDTO } from '@modules/users/use-cases/create-user/dtos/create-user.dto';
import { Inject, Logger } from '@nestjs/common';
import { ProviderToken } from '@src/shared/enums/provider-token.enum';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

export class CreateUserService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(ProviderToken.PASSWORD_HASH)
    private readonly passwordHash: IPasswordHash,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserDTO> {
    const existingUser = await this.usersRepository.findOneByEmail(data.email);

    if (existingUser) {
      throw new UserErrors.DuplicatedEmail(this.logger);
    }

    const { password, ...userData } = data;
    const hashedPassword = await this.passwordHash.hash(password);

    const createdUser = await this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    delete createdUser.password;

    return createdUser;
  }
}
