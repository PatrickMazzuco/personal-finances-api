import { BCryptPasswordHash } from '@modules/users/providers/implementations/bcrypt-password-hash.provider';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderToken } from '@src/shared/enums/provider-token.enum';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/implementations/users-repository';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { FindUserController } from './use-cases/find-user/find-user.controller';
import { FindUserService } from './use-cases/find-user/find-user.service';
import { UpdateUserController } from './use-cases/update-user/update-user.controller';
import { UpdateUserService } from './use-cases/update-user/update-user.service';

const usersRepositoryProvider = {
  provide: RepositoryToken.USERS_REPOSITORY,
  useClass: UsersRepository,
};

const passwordHashProvider = {
  provide: ProviderToken.PASSWORD_HASH,
  useClass: BCryptPasswordHash,
};
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController, FindUserController, UpdateUserController],
  providers: [
    usersRepositoryProvider,
    passwordHashProvider,
    CreateUserService,
    FindUserService,
    UpdateUserService,
  ],
  exports: [usersRepositoryProvider, passwordHashProvider],
})
export class UsersModule {}
