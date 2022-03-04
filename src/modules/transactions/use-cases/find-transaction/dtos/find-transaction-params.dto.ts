import { PickType } from '@nestjs/swagger';

import { FindTransactionDTO } from './find-transaction.dto';

export class FindTransactionParamsDTO extends PickType(FindTransactionDTO, [
  'id',
]) {}
