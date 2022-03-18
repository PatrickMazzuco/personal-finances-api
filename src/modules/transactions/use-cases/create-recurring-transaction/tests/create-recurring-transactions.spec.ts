import { RecurringTransactionsRepository } from '@modules/transactions/repositories/implementations/recurring-transactions-repository';
import { UsersRepository } from '@modules/users/repositories/implementations/users-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import {
  createRecurringTransactionMock,
  recurringTransactionEntityMock,
} from '@utils/tests/mocks/recurring-transactions.mocks';

import { CreateRecurringTransactionService } from '../create-recurring-transaction.service';

describe('CreateTransactionService', () => {
  let app: INestApplication;

  let createTransactionService: CreateRecurringTransactionService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    createTransactionService = module.get<CreateRecurringTransactionService>(
      CreateRecurringTransactionService,
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new transaction', async () => {
    const transaction = recurringTransactionEntityMock();
    const newTransactionData = createRecurringTransactionMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction.user);

    jest
      .spyOn(RecurringTransactionsRepository.prototype, 'create')
      .mockResolvedValueOnce(transaction);

    const createdTransaction = await createTransactionService.execute(
      newTransactionData,
    );

    expect(createdTransaction).toMatchObject(transaction);
  });
});
