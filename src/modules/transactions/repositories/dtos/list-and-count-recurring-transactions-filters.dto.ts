import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { PartialType, PickType } from '@nestjs/swagger';

class ListRecurringTransactionsFieldsDTO extends PickType(
  RecurringTransactionDTO,
  ['type', 'description', 'active', 'userId'],
) {}

export class ListRecurringTransactionsFiltersDTO extends PartialType(
  ListRecurringTransactionsFieldsDTO,
) {}
