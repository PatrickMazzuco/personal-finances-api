import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { PickType } from '@nestjs/swagger';

export class CreateTransactionRequestDTO extends PickType(TransactionDTO, [
  'userId',
]) {}
