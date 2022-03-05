import { v4 as uuid } from 'uuid';

import { TransactionErrors } from '@modules/transactions/errors/transaction.errors';
import { TransactionsRepository } from '@modules/transactions/repositories/implementations/transactions-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { transactionEntityMock } from '@utils/tests/mocks/transactions.mocks';

import { DeleteTransactionService } from '../delete-transaction.service';

describe('DeleteTransactionService', () => {
  let app: INestApplication;

  let deleteTransactionService: DeleteTransactionService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    deleteTransactionService = module.get<DeleteTransactionService>(
      DeleteTransactionService,
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete a transaction', async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    jest
      .spyOn(TransactionsRepository.prototype, 'delete')
      .mockResolvedValueOnce();

    await expect(
      deleteTransactionService.execute({
        id: transaction.id,
        userId: transaction.userId,
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete an inexistent transaction', async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(
      deleteTransactionService.execute({
        id: transaction.id,
        userId: transaction.userId,
      }),
    ).rejects.toBeInstanceOf(TransactionErrors.NotFound);
  });

  it('should not be able to delete a transatiction of a different user', async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    await expect(
      deleteTransactionService.execute({
        id: transaction.id,
        userId: uuid(),
      }),
    ).rejects.toBeInstanceOf(TransactionErrors.Forbidden);
  });
});
