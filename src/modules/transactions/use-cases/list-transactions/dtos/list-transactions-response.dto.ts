import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationAdapterDTO } from '@src/adapters/PaginationAdapter/dtos/pagination-adapter.dto';

export class ListTransactionsResponseDTO extends PaginationAdapterDTO<TransactionDTO> {
  @ApiProperty({ type: TransactionDTO, isArray: true })
  data: TransactionDTO[];
}
