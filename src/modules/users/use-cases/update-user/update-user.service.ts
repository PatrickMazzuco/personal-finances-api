import { UserErrors } from '@modules/users/errors/user.errors';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';
import { PasswordHash } from '@utils/security/password-hash';

import { UpdateUserDTO } from './dtos/update-user.dto';

export class UpdateUserService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(data: UpdateUserDTO): Promise<void> {
    const existingUser = await this.usersRepository.findOne(data.id);

    if (!existingUser) {
      throw new UserErrors.NotFound(this.logger);
    }

    const userByEmail = await this.usersRepository.findOneByEmail(data.email);

    if (userByEmail && userByEmail.id !== existingUser.id) {
      throw new UserErrors.DuplicatedEmail(this.logger);
    }

    const hashedPassword = await PasswordHash.hash(data.password);

    const userToUpdate = {
      ...existingUser,
      ...data,
      password: hashedPassword,
    };

    await this.usersRepository.update(userToUpdate);
  }
}
