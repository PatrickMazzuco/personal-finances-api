import { Module } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { UsersRepository } from './repositories/implementations/users-repository';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { FindUserController } from './use-cases/find-user/find-user.controller';
import { FindUserService } from './use-cases/find-user/find-user.service';

@Module({
  imports: [],
  controllers: [CreateUserController, FindUserController],
  providers: [
    {
      provide: RepositoryToken.USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    CreateUserService,
    FindUserService,
  ],
  exports: [],
})
export class UsersModule {}
