import { ListAndCountDTO } from '@src/shared/dtos/list-and-count.dto';

import { RecurringTransaction } from '../entities/recurring-transaction.entity';
import { CreateRecurringTransactionDTO } from './dtos/create-recurring-transaction.dto';
import { ListAndCountRecurringTransactionsOptionsDTO } from './dtos/list-and-count-recurring-transactions-options.dto';

export interface IRecurringTransactionsRepository {
  create(data: CreateRecurringTransactionDTO): Promise<RecurringTransaction>;
  findOne(id: string): Promise<RecurringTransaction>;
  list(userId: string): Promise<RecurringTransaction[]>;
  listAndCount(
    options: ListAndCountRecurringTransactionsOptionsDTO,
  ): Promise<ListAndCountDTO<RecurringTransaction>>;
  update(id: string, data: RecurringTransaction): Promise<void>;
  delete(id: string): Promise<void>;
  truncateTable(): Promise<void>;
}
