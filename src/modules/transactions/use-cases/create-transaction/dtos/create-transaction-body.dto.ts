import { OmitType } from '@nestjs/swagger';

import { CreateTransactionDTO } from './create-transaction.dto';

export class CreateTransactionBodyDTO extends OmitType(CreateTransactionDTO, [
  'userId',
]) {}
