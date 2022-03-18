import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { RecurringTransactionSortingAttribute } from '@modules/transactions/enums/recurring-transaction-sorting-attribute.enum';
import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { PaginationFiltersDTO } from '@src/adapters/PaginationAdapter/dtos/pagination-filters-dto';
import { SortingOrder } from '@src/shared/enums/sorting-order.enum';

class ListRecurringTransactionsFieldsDTO extends PickType(
  RecurringTransactionDTO,
  ['type', 'description'],
) {}

class ListRecurringTransactionsFieldsPaginationDTO extends IntersectionType(
  ListRecurringTransactionsFieldsDTO,
  PaginationFiltersDTO,
) {}

export class ListRecurringTransactionsQueryDTO extends PartialType(
  ListRecurringTransactionsFieldsPaginationDTO,
) {
  @ApiPropertyOptional({
    enum: RecurringTransactionSortingAttribute,
    default: RecurringTransactionSortingAttribute.PAYMENT_DAY,
  })
  @IsOptional()
  @IsEnum(RecurringTransactionSortingAttribute, {
    message: `The value of the field 'sort' must be one of the following: ${Object.values(
      RecurringTransactionSortingAttribute,
    ).join(', ')}`,
  })
  sort?: RecurringTransactionSortingAttribute;

  @ApiPropertyOptional({ enum: SortingOrder, default: SortingOrder.DESCENDING })
  @IsOptional()
  @IsEnum(SortingOrder, {
    message: `The value of the field 'order' must be one of the following: ${Object.values(
      SortingOrder,
    ).join(', ')}`,
  })
  order?: SortingOrder;

  @IsNumber()
  @Max(31)
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 12 })
  paymentDay?: number;
}
