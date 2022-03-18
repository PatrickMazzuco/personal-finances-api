import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateRecurringTransactionDTO extends OmitType(
  RecurringTransactionDTO,
  ['id', 'user', 'active', 'createdAt', 'updatedAt'],
) {}
