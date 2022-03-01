import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { ITransactionsRepository } from '@modules/transactions/repositories/transactions-repository.interface';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { Inject, Logger } from '@nestjs/common';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

import { TransactionErrors } from '../../errors/transaction.errors';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';

export class CreateTransactionService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(RepositoryToken.TRANSACTIONS_REPOSITORY)
    private readonly transactionsRepository: ITransactionsRepository,

    @Inject(RepositoryToken.USERS_REPOSITORY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionDTO> {
    const existingUser = await this.usersRepository.findOne(data.userId);

    if (!existingUser) {
      throw new TransactionErrors.UserNotFound(this.logger);
    }

    const createdTransaction = await this.transactionsRepository.create(data);

    return createdTransaction;
  }
}
