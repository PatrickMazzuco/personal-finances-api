import { IntersectionType } from '@nestjs/swagger';

import { FindTransactionParamsDTO } from './find-transaction-params.dto';
import { FindTransactionRequestDTO } from './find-transaction-request.dto';

export class FindTransactionDTO extends IntersectionType(
  FindTransactionParamsDTO,
  FindTransactionRequestDTO,
) {}
