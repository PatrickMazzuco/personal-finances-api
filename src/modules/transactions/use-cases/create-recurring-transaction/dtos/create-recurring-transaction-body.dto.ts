import { OmitType } from '@nestjs/swagger';

import { CreateRecurringTransactionDTO } from './create-recurring-transaction.dto';

export class CreateRecurringTransactionBodyDTO extends OmitType(
  CreateRecurringTransactionDTO,
  ['userId'],
) {}
