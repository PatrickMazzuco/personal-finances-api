import { CreateTransactionDTO } from '@modules/transactions/repositories/dtos/create-transaction.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateTransactionBodyDTO extends OmitType(CreateTransactionDTO, [
  'userId',
]) {}
