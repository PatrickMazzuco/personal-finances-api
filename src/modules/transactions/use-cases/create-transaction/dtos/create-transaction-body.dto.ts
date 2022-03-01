import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateTransactionBodyDTO extends OmitType(TransactionDTO, [
  'id',
  'user',
  'userId',
  'createdAt',
  'updatedAt',
]) {}
