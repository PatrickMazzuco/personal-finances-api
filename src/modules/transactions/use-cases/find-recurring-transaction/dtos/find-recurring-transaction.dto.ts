import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { PickType } from '@nestjs/swagger';

export class FindRecurringTransactionDTO extends PickType(
  RecurringTransactionDTO,
  ['id', 'userId'],
) {}
