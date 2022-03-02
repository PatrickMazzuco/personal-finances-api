import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { PickType } from '@nestjs/swagger';

export class FindTransactionParamsDTO extends PickType(TransactionDTO, [
  'id',
]) {}
