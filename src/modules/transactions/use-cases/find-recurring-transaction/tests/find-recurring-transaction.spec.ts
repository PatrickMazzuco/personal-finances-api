import { v4 as uuid } from 'uuid';

import { RecurringTransactionErrors } from '@modules/transactions/errors/recurring-transaction.errors';
import { RecurringTransactionsRepository } from '@modules/transactions/repositories/implementations/recurring-transactions-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { recurringTransactionEntityMock } from '@utils/tests/mocks/recurring-transactions.mocks';

import { FindRecurringTransactionService } from '../find-recurring-transaction.service';

describe('FindRecurringTransactionService', () => {
  let app: INestApplication;

  let findRecurringTransactionService: FindRecurringTransactionService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    findRecurringTransactionService =
      module.get<FindRecurringTransactionService>(
        FindRecurringTransactionService,
      );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to find an existing recurring transaction', async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    const createdTransaction = await findRecurringTransactionService.execute({
      id: transaction.id,
      userId: transaction.userId,
    });

    expect(createdTransaction).toMatchObject(transaction);
  });

  it('should not be able to find an inexistent recurring transaction', async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(null);

    await expect(
      findRecurringTransactionService.execute({
        id: transaction.id,
        userId: transaction.userId,
      }),
    ).rejects.toBeInstanceOf(RecurringTransactionErrors.NotFound);
  });

  it('should not be able to find a recurring transaction of a different user', async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction);

    await expect(
      findRecurringTransactionService.execute({
        id: transaction.id,
        userId: uuid(),
      }),
    ).rejects.toBeInstanceOf(RecurringTransactionErrors.Forbidden);
  });
});
