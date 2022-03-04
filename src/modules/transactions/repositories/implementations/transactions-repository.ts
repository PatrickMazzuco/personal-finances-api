import { Like, Repository } from 'typeorm';

import { Transaction } from '@modules/transactions/entities/transaction';
import { InjectRepository } from '@nestjs/typeorm';
import { ListAndCountDTO } from '@src/shared/dtos/list-and-count.dto';
import {
  SortingOrder,
  translateSortingOrder,
} from '@src/shared/enums/sorting-order.enum';

import { CreateTransactionDTO } from '../dtos/create-transaction.dto';
import { ListAndCountTransactionsOptionsDTO } from '../dtos/list-and-count-transactions-options.dto';
import { UpdateTransactionDTO } from '../dtos/update-transaction.dto';
import { ITransactionsRepository } from '../transactions-repository.interface';

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

  async listAndCount({
    filters,
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = SortingOrder.DESCENDING,
  }: ListAndCountTransactionsOptionsDTO): Promise<
    ListAndCountDTO<Transaction>
  > {
    const parsedFilters = {
      ...filters,
      description: Like(`%${filters.description}%`),
    };

    if (!filters.description) delete parsedFilters.description;

    const [transactions, count] = await this.repository.findAndCount({
      where: { ...parsedFilters },
      take: limit,
      skip: limit * (page - 1),
      order: {
        [sort]: translateSortingOrder(order),
      },
    });

    return {
      data: transactions,
      count,
    };
  }

  async update(id: string, data: UpdateTransactionDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async truncateTable(): Promise<void> {
    await this.repository.query('DELETE FROM transactions');
  }
}
