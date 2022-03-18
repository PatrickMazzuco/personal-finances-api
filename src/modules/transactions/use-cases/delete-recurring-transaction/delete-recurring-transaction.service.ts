import { RecurringTransactionErrors } from '@modules/transactions/errors/recurring-transaction.errors';
import { IRecurringTransactionsRepository } from '@modules/transactions/repositories/recurring-transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { DeleteRecurringTransactionDTO } from './dtos/delete-recurring-transaction.dto';

export class DeleteRecurringTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.RECURRING_TRANSACTIONS_REPOSITORY)
    private readonly recurringTransactionsRepository: IRecurringTransactionsRepository,
  ) {}

  async execute({ id, userId }: DeleteRecurringTransactionDTO): Promise<void> {
    const existingRecurringTransaction =
      await this.recurringTransactionsRepository.findOne(id);

    if (!existingRecurringTransaction) {
      throw new RecurringTransactionErrors.NotFound(this.logger);
    }

    if (existingRecurringTransaction.userId !== userId) {
      throw new RecurringTransactionErrors.Forbidden(this.logger);
    }

    await this.recurringTransactionsRepository.delete(id);
  }
}
