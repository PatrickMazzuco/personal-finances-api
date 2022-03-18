import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationAdapterDTO } from '@src/adapters/PaginationAdapter/dtos/pagination-adapter.dto';

export class ListRecurringTransactionsResponseDTO extends PaginationAdapterDTO<RecurringTransactionDTO> {
  @ApiProperty({ type: RecurringTransactionDTO, isArray: true })
  data: RecurringTransactionDTO[];
}
