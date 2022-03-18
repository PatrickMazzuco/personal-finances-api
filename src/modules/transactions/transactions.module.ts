import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { Transaction } from './entities/transaction.entity';
import { RecurringTransactionsRepository } from './repositories/implementations/recurring-transactions-repository';
import { TransactionsRepository } from './repositories/implementations/transactions-repository';
import { CreateRecurringTransactionController } from './use-cases/create-recurring-transaction/create-recurring-transaction.controller';
import { CreateRecurringTransactionService } from './use-cases/create-recurring-transaction/create-recurring-transaction.service';
import { CreateTransactionController } from './use-cases/create-transaction/create-transaction.controller';
import { CreateTransactionService } from './use-cases/create-transaction/create-transaction.service';
import { DeleteRecurringTransactionController } from './use-cases/delete-recurring-transaction/delete-recurring-transaction.controller';
import { DeleteRecurringTransactionService } from './use-cases/delete-recurring-transaction/delete-recurring-transaction.service';
import { DeleteTransactionController } from './use-cases/delete-transaction/delete-transaction.controller';
import { DeleteTransactionService } from './use-cases/delete-transaction/delete-transaction.service';
import { FindRecurringTransactionController } from './use-cases/find-recurring-transaction/find-recurring-transaction.controller';
import { FindRecurringTransactionService } from './use-cases/find-recurring-transaction/find-recurring-transaction.service';
import { FindTransactionController } from './use-cases/find-transaction/find-transaction.controller';
import { FindTransactionService } from './use-cases/find-transaction/find-transaction.service';
import { ListRecurringTransactionsController } from './use-cases/list-recurring-transactions/list-recurring-transactions.controller';
import { ListRecurringTransactionsService } from './use-cases/list-recurring-transactions/list-recurring-transactions.service';
import { ListTransactionsController } from './use-cases/list-transactions/list-transactions.controller';
import { ListTransactionsService } from './use-cases/list-transactions/list-transactions.service';

const transactionsRepositoryProvider = {
  provide: RepositoryToken.TRANSACTIONS_REPOSITORY,
  useClass: TransactionsRepository,
};

const recurringTransactionsRepositoryProvider = {
  provide: RepositoryToken.RECURRING_TRANSACTIONS_REPOSITORY,
  useClass: RecurringTransactionsRepository,
};
@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, RecurringTransaction]),
    UsersModule,
  ],
  controllers: [
    CreateTransactionController,
    ListTransactionsController,
    FindTransactionController,
    DeleteTransactionController,
    CreateRecurringTransactionController,
    ListRecurringTransactionsController,
    FindRecurringTransactionController,
    DeleteRecurringTransactionController,
  ],
  providers: [
    transactionsRepositoryProvider,
    recurringTransactionsRepositoryProvider,
    CreateTransactionService,
    ListTransactionsService,
    FindTransactionService,
    DeleteTransactionService,
    CreateRecurringTransactionService,
    ListRecurringTransactionsService,
    FindRecurringTransactionService,
    DeleteRecurringTransactionService,
  ],
})
export class TransactionsModule {}
