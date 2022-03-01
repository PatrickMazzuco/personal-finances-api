import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { PartialType, PickType } from '@nestjs/swagger';

class ListTransactionsFieldsDTO extends PickType(TransactionDTO, [
  'type',
  'description',
  'userId',
]) {}

export class ListTransactionsFiltersDTO extends PartialType(
  ListTransactionsFieldsDTO,
) {}
