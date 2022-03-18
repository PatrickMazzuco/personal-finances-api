import { RecurringTransaction } from '@modules/transactions/entities/recurring-transaction.entity';
import { IRecurringTransactionsRepository } from '@modules/transactions/repositories/recurring-transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ListAndCountDTO } from '@src/shared/dtos/list-and-count.dto';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { ListRecurringTransactionsPaginationOptionsDTO } from './dtos/list-recurring-transactions-pagination-options.dto';
import { ListRecurringTransactionsDTO } from './dtos/list-recurring-transactions.dto';

export class ListRecurringTransactionsService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.RECURRING_TRANSACTIONS_REPOSITORY)
    private readonly recurringTransactionsRepository: IRecurringTransactionsRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    query: ListRecurringTransactionsDTO,
    paginationOptions: ListRecurringTransactionsPaginationOptionsDTO,
  ): Promise<ListAndCountDTO<RecurringTransaction>> {
    const { limit, page } = paginationOptions;

    const { sort, order, ...filters } = query;

    const transactions =
      await this.recurringTransactionsRepository.listAndCount({
        filters,
        page,
        limit,
        sort,
        order,
      });

    return transactions;
  }
}
