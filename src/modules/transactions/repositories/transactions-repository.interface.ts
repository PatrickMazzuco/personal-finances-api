import { Transaction } from '../entities/transaction';
import { CreateTransactionDTO } from './implementations/dtos/create-transaction.dto';

export interface ITransactionsRepository {
  create(data: CreateTransactionDTO): Promise<Transaction>;
  findOne(id: string): Promise<Transaction>;
  list(userId: string): Promise<Transaction[]>;
  update(id: string, data: Transaction): Promise<void>;
  truncateTable(): Promise<void>;
}
