import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { ITransactionsRepository } from '@modules/transactions/repositories/transactions-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { CreateTransactionDTO } from './dtos/create-transaction.dto';

export class CreateTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionDTO> {
    const currentDate = new Date();
    const paymentDate = data.paymentDate
      ? new Date(data.paymentDate)
      : new Date();

    const transactionWasPaid = currentDate > paymentDate;
    const createdTransaction = await this.transactionsRepository.create({
      ...data,
      paid: transactionWasPaid,
    });

    return createdTransaction;
  }
}
