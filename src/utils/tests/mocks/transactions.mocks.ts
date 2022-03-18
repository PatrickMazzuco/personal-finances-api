import { v4 as uuid } from 'uuid';

import { Transaction } from '@modules/transactions/entities/transaction.entity';
import { TransactionType } from '@modules/transactions/enums/transaction-type.enum';
import { CreateTransactionDTO } from '@modules/transactions/repositories/dtos/create-transaction.dto';
import { UpdateTransactionDTO } from '@modules/transactions/repositories/dtos/update-transaction.dto';

import { userEntityMock } from './users.mocks';

export function transactionEntityMock(): Transaction {
  const transactionUser = userEntityMock();
  return {
    id: uuid(),
    userId: transactionUser.id,
    amount: 10000,
    type: TransactionType.EXPENSE,
    paymentDate: new Date(),
    paid: true,
    description: 'transaction description',
    user: transactionUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createTransactionMock(): CreateTransactionDTO {
  const { userId, amount, type, description, paymentDate, paid } =
    transactionEntityMock();

  return {
    userId,
    amount,
    type,
    description,
    paymentDate,
    paid,
  };
}

export function updateTransactionMock(): UpdateTransactionDTO {
  const { amount, type, description } = transactionEntityMock();
  return {
    amount,
    type,
    description,
  };
}
