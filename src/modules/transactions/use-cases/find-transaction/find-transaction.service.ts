import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { TransactionErrors } from '@modules/transactions/errors/transaction.errors';
import { ITransactionsRepository } from '@modules/transactions/repositories/transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { FindTransactionDTO } from './dtos/find-transaction.dto';

export class FindTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(data: FindTransactionDTO): Promise<TransactionDTO> {
    const existingTransaction = await this.transactionsRepository.findOne(
      data.id,
    );

    if (!existingTransaction) {
      throw new TransactionErrors.NotFound(this.logger);
    }

    if (existingTransaction.userId !== data.userId) {
      throw new TransactionErrors.Forbidden(this.logger);
    }

    return existingTransaction;
  }
}
