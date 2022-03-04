import { v4 as uuid } from 'uuid';

import { TransactionErrors } from '@modules/transactions/errors/transaction.errors';
import { TransactionsRepository } from '@modules/transactions/repositories/implementations/transactions-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { transactionEntityMock } from '@utils/tests/mocks/transactions.mocks';

import { FindTransactionService } from '../find-transaction.service';

describe('FindTransactionService', () => {
  let app: INestApplication;

  let findTransactionService: FindTransactionService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    findTransactionService = module.get<FindTransactionService>(
      FindTransactionService,
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be find an existing transaction', async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    const createdTransaction = await findTransactionService.execute({
      id: transaction.id,
      userId: transaction.userId,
    });

    expect(createdTransaction).toMatchObject(transaction);
  });

  it('should not be able to find an inexistent transaction', async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(
      findTransactionService.execute({
        id: transaction.id,
        userId: transaction.userId,
      }),
    ).rejects.toBeInstanceOf(TransactionErrors.NotFound);
  });

  it('should not be able to find a transatiction of a different user', async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    await expect(
      findTransactionService.execute({
        id: transaction.id,
        userId: uuid(),
      }),
    ).rejects.toBeInstanceOf(TransactionErrors.Forbidden);
  });
});
