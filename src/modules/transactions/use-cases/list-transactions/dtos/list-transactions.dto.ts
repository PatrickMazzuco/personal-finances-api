import { IntersectionType } from '@nestjs/swagger';

import { ListTransactionsQueryDTO } from './list-transactions-query.dto';
import { ListTransactionsRequestDTO } from './list-transactions-request.dto';

export class ListTransactionsDTO extends IntersectionType(
  ListTransactionsQueryDTO,
  ListTransactionsRequestDTO,
) {}
