import { UserDTO } from '@modules/users/dtos/user.dto';
import { UserErrors } from '@modules/users/errors/user.errors';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { FindUserDTO } from './dtos/find-user.dto';

export class FindUserService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: FindUserDTO): Promise<UserDTO> {
    const existingUser = await this.usersRepository.findOne(id);

    if (!existingUser) {
      throw new UserErrors.NotFound(this.logger);
    }

    delete existingUser.password;

    return existingUser;
  }
}
