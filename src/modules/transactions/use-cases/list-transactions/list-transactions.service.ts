import { Transaction } from '@modules/transactions/entities/transaction.entity';
import { ITransactionsRepository } from '@modules/transactions/repositories/transactions-repository.interface';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ListAndCountDTO } from '@src/shared/dtos/list-and-count.dto';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { ListTransactionsPaginationOptionsDTO } from './dtos/list-transactions-pagination-options.dto';
import { ListTransactionsDTO } from './dtos/list-transactions.dto';

export class ListTransactionsService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: ITransactionsRepository,

    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,

    private readonly configService: ConfigService,
  ) {}

  async execute(
    query: ListTransactionsDTO,
    paginationOptions: ListTransactionsPaginationOptionsDTO,
  ): Promise<ListAndCountDTO<Transaction>> {
    const { limit, page } = paginationOptions;

    const { sort, order, ...filters } = query;

    const transactions = await this.transactionsRepository.listAndCount({
      filters,
      page,
      limit,
      sort,
      order,
    });

    return transactions;
  }
}
