import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { UsersRepository } from './repositories/implementations/users-repository';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { FindUserController } from './use-cases/find-user/find-user.controller';
import { FindUserService } from './use-cases/find-user/find-user.service';
import { UpdateUserController } from './use-cases/update-user/update-user.controller';
import { UpdateUserService } from './use-cases/update-user/update-user.service';

@Module({
  imports: [],
  controllers: [CreateUserController, FindUserController, UpdateUserController],
  providers: [
    {
      provide: RepositoryToken.USERS_REPOSITORY,
      useClass: UsersRepository,
    },
    PrismaService,
    CreateUserService,
    FindUserService,
    UpdateUserService,
  ],
  exports: [],
})
export class UsersModule {}
