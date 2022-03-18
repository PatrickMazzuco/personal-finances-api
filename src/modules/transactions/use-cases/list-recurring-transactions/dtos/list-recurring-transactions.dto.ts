import { IntersectionType } from '@nestjs/swagger';

import { ListRecurringTransactionsQueryDTO } from './list-recurring-transactions-query.dto';
import { ListRecurringTransactionsRequestDTO } from './list-recurring-transactions-request.dto';

export class ListRecurringTransactionsDTO extends IntersectionType(
  ListRecurringTransactionsQueryDTO,
  ListRecurringTransactionsRequestDTO,
) {}
