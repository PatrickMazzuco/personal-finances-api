import { User } from '@modules/users/entities/user';
import { UserErrors } from '@modules/users/errors/user.errors';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { CreateUserDTO } from '@modules/users/use-cases/create-user/dtos/create-user.dto';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';
import { PasswordHash } from '@utils/security/password-hash';

export class CreateUserService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const existingUser = await this.usersRepository.findOneByEmail(data.email);

    if (existingUser) {
      throw new UserErrors.DuplicatedEmail(this.logger);
    }

    const { password, ...userData } = data;
    const hashedPassword = await PasswordHash.hash(password);

    return this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }
}
