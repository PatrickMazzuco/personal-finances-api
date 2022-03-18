import { ListAndCountDTO } from '@src/shared/dtos/list-and-count.dto';

import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { ListAndCountTransactionsOptionsDTO } from './dtos/list-and-count-transactions-options.dto';

export interface ITransactionsRepository {
  create(data: CreateTransactionDTO): Promise<Transaction>;
  findOne(id: string): Promise<Transaction>;
  list(userId: string): Promise<Transaction[]>;
  listAndCount(
    options: ListAndCountTransactionsOptionsDTO,
  ): Promise<ListAndCountDTO<Transaction>>;
  update(id: string, data: Transaction): Promise<void>;
  delete(id: string): Promise<void>;
  truncateTable(): Promise<void>;
}
