import { TransactionsRepository } from '@modules/transactions/repositories/implementations/transactions-repository';
import { UsersRepository } from '@modules/users/repositories/implementations/users-repository';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import {
  createTransactionMock,
  transactionEntityMock,
} from '@utils/tests/mocks/transactions.mocks';

import { CreateTransactionService } from '../create-transaction.service';

describe('CreateTransactionService', () => {
  let app: INestApplication;

  let createTransactionService: CreateTransactionService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    createTransactionService = module.get<CreateTransactionService>(
      CreateTransactionService,
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new transaction', async () => {
    const transaction = transactionEntityMock();
    const newTransactionData = createTransactionMock();

    jest
      .spyOn(UsersRepository.prototype, 'findOne')
      .mockResolvedValueOnce(transaction.user);

    jest
      .spyOn(TransactionsRepository.prototype, 'create')
      .mockResolvedValueOnce(transaction);

    const createdTransaction = await createTransactionService.execute(
      newTransactionData,
    );

    expect(createdTransaction).toMatchObject(transaction);
  });
});
