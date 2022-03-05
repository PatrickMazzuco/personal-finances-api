import { TransactionsRepository } from '@modules/transactions/repositories/implementations/transactions-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { transactionEntityMock } from '@utils/tests/mocks/transactions.mocks';

import { ListTransactionsService } from '../list-transactions.service';

describe('ListTransactionsService', () => {
  let app: INestApplication;

  let listTransactionsService: ListTransactionsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    listTransactionsService = module.get<ListTransactionsService>(
      ListTransactionsService,
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a user's transactions", async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'listAndCount')
      .mockResolvedValueOnce({
        data: [transaction],
        count: 1,
      });

    const createdTransaction = await listTransactionsService.execute(
      {
        userId: transaction.userId,
      },
      {},
    );

    expect(createdTransaction.count).toBe(1);
    expect(createdTransaction.data).toHaveLength(1);
    expect(createdTransaction.data[0]).toBe(transaction);
  });

  it("should be able to list a user's transactions (with no transactions)", async () => {
    const transaction = transactionEntityMock();

    jest
      .spyOn(TransactionsRepository.prototype, 'listAndCount')
      .mockResolvedValueOnce({
        data: [],
        count: 0,
      });

    const createdTransaction = await listTransactionsService.execute(
      {
        userId: transaction.userId,
      },
      {},
    );

    expect(createdTransaction.count).toBe(0);
    expect(createdTransaction.data).toHaveLength(0);
  });
});
