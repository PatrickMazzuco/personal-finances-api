import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { User } from './entities/user';
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
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController, FindUserController, UpdateUserController],
  providers: [
    usersRepositoryProvider,
    CreateUserService,
    FindUserService,
    UpdateUserService,
  ],
  exports: [usersRepositoryProvider],
})
export class UsersModule {}
