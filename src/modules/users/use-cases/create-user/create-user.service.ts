import { UserDTO } from '@modules/users/dtos/user.dto';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { CreateUserDTO } from '@modules/users/use-cases/create-user/dtos/create-user.dto';
import { Inject } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';
import { PasswordHash } from '@utils/security/password-hash';

export class CreateUserService {
  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserDTO> {
    const { password, ...userData } = data;
    const hashedPassword = await PasswordHash.hash(password);

    return this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }
}
