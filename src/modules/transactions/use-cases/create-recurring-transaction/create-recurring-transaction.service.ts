import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { IRecurringTransactionsRepository } from '@modules/transactions/repositories/recurring-transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { CreateRecurringTransactionDTO } from './dtos/create-recurring-transaction.dto';

export class CreateRecurringTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.RECURRING_TRANSACTIONS_REPOSITORY)
    private readonly recurringTransactionsRepository: IRecurringTransactionsRepository,
  ) {}

  async execute(
    data: CreateRecurringTransactionDTO,
  ): Promise<RecurringTransactionDTO> {
    const createdRecurringTransaction =
      await this.recurringTransactionsRepository.create({
        ...data,
      });

    return createdRecurringTransaction;
  }
}
