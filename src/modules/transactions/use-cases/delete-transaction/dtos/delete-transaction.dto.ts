import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { PickType } from '@nestjs/swagger';

export class DeleteTransactionDTO extends PickType(TransactionDTO, [
  'id',
  'userId',
]) {}
