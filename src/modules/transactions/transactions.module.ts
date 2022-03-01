import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { Transaction } from './entities/transaction';
import { TransactionsRepository } from './repositories/implementations/transactions-repository';
import { CreateTransactionController } from './use-cases/create-transaction/create-transaction.controller';
import { CreateTransactionService } from './use-cases/create-transaction/create-transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UsersModule],
  controllers: [CreateTransactionController],
  providers: [
    {
      provide: RepositoryToken.TRANSACTIONS_REPOSITORY,
      useClass: TransactionsRepository,
    },
    CreateTransactionService,
  ],
})
export class TransactionsModule {}
