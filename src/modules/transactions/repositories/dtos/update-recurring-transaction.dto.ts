import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

class UpdateRecurringTransactionFields extends OmitType(
  RecurringTransactionDTO,
  ['id', 'user', 'userId', 'createdAt', 'updatedAt'],
) {}

export class UpdateRecurringTransactionDTO extends PartialType(
  UpdateRecurringTransactionFields,
) {}
