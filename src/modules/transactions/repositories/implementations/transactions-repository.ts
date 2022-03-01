import { Repository } from 'typeorm';

import { Transaction } from '@modules/transactions/entities/transaction';
import { InjectRepository } from '@nestjs/typeorm';

import { ITransactionsRepository } from '../transactions-repository.interface';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { UpdateTransactionDTO } from './dtos/update-transaction.dto';

export class TransactionsRepository implements ITransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
  ) {}
  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const createdTransaction = await this.repository.save(data);

    return createdTransaction;
  }

  async findOne(id: string): Promise<Transaction> {
    return this.repository.findOne(id);
  }

  async list(userId: string): Promise<Transaction[]> {
    return this.repository.find({ where: { userId } });
  }

  async update(id: string, data: UpdateTransactionDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async truncateTable(): Promise<void> {
    await this.repository.query('DELETE FROM transactions');
  }
}
