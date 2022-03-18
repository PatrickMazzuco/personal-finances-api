import { v4 as uuid } from 'uuid';

import { RecurringTransaction } from '@modules/transactions/entities/recurring-transaction.entity';
import { TransactionType } from '@modules/transactions/enums/transaction-type.enum';
import { CreateRecurringTransactionDTO } from '@modules/transactions/repositories/dtos/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDTO } from '@modules/transactions/repositories/dtos/update-recurring-transaction.dto';

import { userEntityMock } from './users.mocks';

export function recurringTransactionEntityMock(): RecurringTransaction {
  const transactionUser = userEntityMock();
  return {
    id: uuid(),
    userId: transactionUser.id,
    amount: 10000,
    type: TransactionType.EXPENSE,
    paymentDay: 15,
    description: 'transaction description',
    user: transactionUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createRecurringTransactionMock(): CreateRecurringTransactionDTO {
  const { userId, amount, type, description, paymentDay } =
    recurringTransactionEntityMock();

  return {
    userId,
    amount,
    type,
    description,
    paymentDay,
  };
}

export function updateRecurringTransactionMock(): UpdateRecurringTransactionDTO {
  const { amount, type, description } = recurringTransactionEntityMock();
  return {
    amount,
    type,
    description,
  };
}
