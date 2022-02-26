import { UserDTO } from '@modules/users/dtos/user.dto';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { FindUserDTO } from './dtos/find-uset.dto';

export class FindUserService {
  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: FindUserDTO): Promise<UserDTO> {
    return this.usersRepository.findOne(id);
  }
}
