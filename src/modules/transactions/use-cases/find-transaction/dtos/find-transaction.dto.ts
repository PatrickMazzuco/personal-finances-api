import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { PickType } from '@nestjs/swagger';

export class FindTransactionDTO extends PickType(TransactionDTO, [
  'id',
  'userId',
]) {}
