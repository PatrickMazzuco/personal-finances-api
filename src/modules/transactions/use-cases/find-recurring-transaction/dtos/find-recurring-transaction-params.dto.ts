import { PickType } from '@nestjs/swagger';

import { FindRecurringTransactionDTO } from './find-recurring-transaction.dto';

export class FindRecurringTransactionParamsDTO extends PickType(
  FindRecurringTransactionDTO,
  ['id'],
) {}
