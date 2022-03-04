import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { Transaction } from './entities/transaction';
import { TransactionsRepository } from './repositories/implementations/transactions-repository';
import { CreateTransactionController } from './use-cases/create-transaction/create-transaction.controller';
import { CreateTransactionService } from './use-cases/create-transaction/create-transaction.service';
import { DeleteTransactionController } from './use-cases/delete-transaction/delete-transaction.controller';
import { DeleteTransactionService } from './use-cases/delete-transaction/delete-transaction.service';
import { FindTransactionController } from './use-cases/find-transaction/find-transaction.controller';
import { FindTransactionService } from './use-cases/find-transaction/find-transaction.service';
import { ListTransactionsController } from './use-cases/list-transactions/list-transactions.controller';
import { ListTransactionsService } from './use-cases/list-transactions/list-transactions.service';

const transactionsRepositoryProvider = {
  provide: RepositoryToken.TRANSACTIONS_REPOSITORY,
  useClass: TransactionsRepository,
};
@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UsersModule],
  controllers: [
    CreateTransactionController,
    ListTransactionsController,
    FindTransactionController,
    DeleteTransactionController,
  ],
  providers: [
    transactionsRepositoryProvider,
    CreateTransactionService,
    ListTransactionsService,
    FindTransactionService,
    DeleteTransactionService,
  ],
})
export class TransactionsModule {}
