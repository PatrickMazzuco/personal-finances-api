import { IntersectionType } from '@nestjs/swagger';

import { CreateTransactionBodyDTO } from './create-transaction-body.dto';
import { CreateTransactionRequestDTO } from './create-transaction-request.dto';

export class CreateTransactionDTO extends IntersectionType(
  CreateTransactionRequestDTO,
  CreateTransactionBodyDTO,
) {}
