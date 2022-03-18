import { FindCondition, ILike, Repository } from 'typeorm';

import { RecurringTransaction } from '@modules/transactions/entities/recurring-transaction.entity';
import { RecurringTransactionSortingAttribute } from '@modules/transactions/enums/recurring-transaction-sorting-attribute.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ListAndCountDTO } from '@src/shared/dtos/list-and-count.dto';
import {
  SortingOrder,
  translateSortingOrder,
} from '@src/shared/enums/sorting-order.enum';

import { CreateRecurringTransactionDTO } from '../dtos/create-recurring-transaction.dto';
import { ListAndCountRecurringTransactionsOptionsDTO } from '../dtos/list-and-count-recurring-transactions-options.dto';
import { UpdateRecurringTransactionDTO } from '../dtos/update-recurring-transaction.dto';
import { IRecurringTransactionsRepository } from '../recurring-transactions-repository.interface';

export class RecurringTransactionsRepository
  implements IRecurringTransactionsRepository
{
  constructor(
    @InjectRepository(RecurringTransaction)
    private repository: Repository<RecurringTransaction>,
  ) {}
  async create(
    data: CreateRecurringTransactionDTO,
  ): Promise<RecurringTransaction> {
    const createdRecurringTransaction = await this.repository.save(data);

    return createdRecurringTransaction;
  }

  async findOne(id: string): Promise<RecurringTransaction> {
    return this.repository.findOne(id);
  }

  async list(userId: string): Promise<RecurringTransaction[]> {
    return this.repository.find({ where: { userId } });
  }

  async listAndCount({
    filters,
    page = 1,
    limit = 10,
    sort = RecurringTransactionSortingAttribute.PAYMENT_DAY,
    order = SortingOrder.DESCENDING,
  }: ListAndCountRecurringTransactionsOptionsDTO): Promise<
    ListAndCountDTO<RecurringTransaction>
  > {
    const { description, ...otherFilters } = filters;

    const parsedFilters: FindCondition<RecurringTransaction> = {
      ...otherFilters,
    };

    if (description) {
      parsedFilters.description = ILike(`%${description}%`);
    }

    const [recurringTransactions, count] = await this.repository.findAndCount({
      where: parsedFilters,
      take: limit,
      skip: limit * (page - 1),
      order: {
        [sort]: translateSortingOrder(order),
      },
    });

    return {
      data: recurringTransactions,
      count,
    };
  }

  async update(id: string, data: UpdateRecurringTransactionDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async truncateTable(): Promise<void> {
    await this.repository.query('DELETE FROM recurringTransactions');
  }
}
