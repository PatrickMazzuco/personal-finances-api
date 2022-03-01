import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

class UpdateTransactionFields extends OmitType(TransactionDTO, [
  'id',
  'user',
  'userId',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateTransactionDTO extends PartialType(
  UpdateTransactionFields,
) {}
