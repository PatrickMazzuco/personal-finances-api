import { v4 as uuid } from 'uuid';

import { RecurringTransactionErrors } from '@modules/transactions/errors/recurring-transaction.errors';
import { RecurringTransactionsRepository } from '@modules/transactions/repositories/implementations/recurring-transactions-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { recurringTransactionEntityMock } from '@utils/tests/mocks/recurring-transactions.mocks';

import { DeleteRecurringTransactionService } from '../delete-recurring-transaction.service';

describe('DeleteRecurringTransactionService', () => {
  let app: INestApplication;

  let deleteRecurringTransactionService: DeleteRecurringTransactionService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    deleteRecurringTransactionService =
      module.get<DeleteRecurringTransactionService>(
        DeleteRecurringTransactionService,
      );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to delete a recurring transaction', async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'delete')
      .mockResolvedValueOnce();

    await expect(
      deleteRecurringTransactionService.execute({
        id: transaction.id,
        userId: transaction.userId,
      }),
    ).resolves.not.toThrow();
  });

  it('should not be able to delete an inexistent recurring transaction', async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(
      deleteRecurringTransactionService.execute({
        id: transaction.id,
        userId: transaction.userId,
      }),
    ).rejects.toBeInstanceOf(RecurringTransactionErrors.NotFound);
  });

  it('should not be able to delete a recurring transaction of a different user', async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    await expect(
      deleteRecurringTransactionService.execute({
        id: transaction.id,
        userId: uuid(),
      }),
    ).rejects.toBeInstanceOf(RecurringTransactionErrors.Forbidden);
  });
});
