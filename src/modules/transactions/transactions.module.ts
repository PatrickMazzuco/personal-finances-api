import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { Transaction } from './entities/transaction';
import { TransactionsRepository } from './repositories/implementations/transactions-repository';
import { CreateTransactionController } from './use-cases/create-transaction/create-transaction.controller';
import { CreateTransactionService } from './use-cases/create-transaction/create-transaction.service';
import { ListTransactionsController } from './use-cases/list-transactions/list-transactions.controller';
import { ListTransactionsService } from './use-cases/list-transactions/list-transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UsersModule],
  controllers: [CreateTransactionController, ListTransactionsController],
  providers: [
    {
      provide: RepositoryToken.TRANSACTIONS_REPOSITORY,
      useClass: TransactionsRepository,
    },
    CreateTransactionService,
    ListTransactionsService,
  ],
})
export class TransactionsModule {}
