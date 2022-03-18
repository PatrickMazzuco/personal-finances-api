import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { RecurringTransactionErrors } from '@modules/transactions/errors/recurring-transaction.errors';
import { IRecurringTransactionsRepository } from '@modules/transactions/repositories/recurring-transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { FindRecurringTransactionDTO } from './dtos/find-recurring-transaction.dto';

export class FindRecurringTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.RECURRING_TRANSACTIONS_REPOSITORY)
    private readonly recurringTransactionsRepository: IRecurringTransactionsRepository,
  ) {}

  async execute(
    data: FindRecurringTransactionDTO,
  ): Promise<RecurringTransactionDTO> {
    const existingRecurringTransaction =
      await this.recurringTransactionsRepository.findOne(data.id);

    if (!existingRecurringTransaction) {
      throw new RecurringTransactionErrors.NotFound(this.logger);
    }

    if (existingRecurringTransaction.userId !== data.userId) {
      throw new RecurringTransactionErrors.Forbidden(this.logger);
    }

    return existingRecurringTransaction;
  }
}
