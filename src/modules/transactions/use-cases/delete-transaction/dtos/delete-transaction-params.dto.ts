import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { PickType } from '@nestjs/swagger';

export class DeleteTransactionParamsDTO extends PickType(TransactionDTO, [
  'id',
]) {}
