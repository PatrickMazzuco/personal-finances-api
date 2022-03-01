import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateTransactionDTO extends OmitType(TransactionDTO, [
  'id',
  'user',
  'createdAt',
  'updatedAt',
]) {}
