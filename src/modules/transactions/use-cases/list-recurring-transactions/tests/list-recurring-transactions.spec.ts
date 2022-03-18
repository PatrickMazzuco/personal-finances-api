import { RecurringTransactionsRepository } from '@modules/transactions/repositories/implementations/recurring-transactions-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { recurringTransactionEntityMock } from '@utils/tests/mocks/recurring-transactions.mocks';

import { ListRecurringTransactionsService } from '../list-recurring-transactions.service';

describe('ListRecurringTransactionsService', () => {
  let app: INestApplication;

  let listRecurringTransactionsService: ListRecurringTransactionsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    listRecurringTransactionsService =
      module.get<ListRecurringTransactionsService>(
        ListRecurringTransactionsService,
      );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a user's recurring transactions", async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'listAndCount')
      .mockResolvedValueOnce({
        data: [transaction],
        count: 1,
      });

    const createdTransaction = await listRecurringTransactionsService.execute(
      {
        userId: transaction.userId,
      },
      {},
    );

    expect(createdTransaction.count).toBe(1);
    expect(createdTransaction.data).toHaveLength(1);
    expect(createdTransaction.data[0]).toBe(transaction);
  });

  it("should be able to list a user's recurring transactions (with no recurring transactions)", async () => {
    const transaction = recurringTransactionEntityMock();

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'listAndCount')
      .mockResolvedValueOnce({
        data: [],
        count: 0,
      });

    const createdTransaction = await listRecurringTransactionsService.execute(
      {
        userId: transaction.userId,
      },
      {},
    );

    expect(createdTransaction.count).toBe(0);
    expect(createdTransaction.data).toHaveLength(0);
  });
});
