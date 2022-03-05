import { UserErrors } from '@modules/users/errors/user.errors';
import { IPasswordHash } from '@modules/users/providers/password-hash.provider';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { ProviderToken } from '@src/shared/enums/provider-token.enum';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { UpdateUserDTO } from './dtos/update-user.dto';

export class UpdateUserService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
    @Inject(ProviderToken.PASSWORD_HASH)
    private readonly passwordHash: IPasswordHash,
  ) {}

  async execute(data: UpdateUserDTO): Promise<void> {
    const { id, ...dataToUpdate } = data;
    const existingUser = await this.usersRepository.findOne(id);

    if (!existingUser) {
      throw new UserErrors.NotFound(this.logger);
    }

    if (data.email) {
      const userByEmail = await this.usersRepository.findOneByEmail(data.email);

      if (userByEmail && userByEmail.id !== existingUser.id) {
        throw new UserErrors.DuplicatedEmail(this.logger);
      }
    }

    if (data.password) {
      const hashedPassword = await this.passwordHash.hash(data.password);
      dataToUpdate.password = hashedPassword;
    }

    await this.usersRepository.update(data.id, dataToUpdate);
  }
}
