import { TransactionErrors } from '@modules/transactions/errors/transaction.errors';
import { ITransactionsRepository } from '@modules/transactions/repositories/transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { DeleteTransactionDTO } from './dtos/delete-transaction.dto';

export class DeleteTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ id, userId }: DeleteTransactionDTO): Promise<void> {
    const existingTransaction = await this.transactionsRepository.findOne(id);

    if (!existingTransaction) {
      throw new TransactionErrors.NotFound(this.logger);
    }

    if (existingTransaction.userId !== userId) {
      throw new TransactionErrors.Forbidden(this.logger);
    }

    await this.transactionsRepository.delete(id);
  }
}
