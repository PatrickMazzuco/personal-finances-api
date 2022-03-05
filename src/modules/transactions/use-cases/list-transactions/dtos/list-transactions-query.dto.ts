import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { PaginationFiltersDTO } from '@src/adapters/PaginationAdapter/dtos/pagination-filters-dto';
import { SortingOrder } from '@src/shared/enums/sorting-order.enum';

export enum SortingAttribute {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PAYMENT_DATE = 'paymentDate',
}

class ListTransactionsFieldsDTO extends PickType(TransactionDTO, [
  'type',
  'description',
]) {}

class ListTransactionsFieldsPaginationDTO extends IntersectionType(
  ListTransactionsFieldsDTO,
  PaginationFiltersDTO,
) {}

export class ListTransactionsQueryDTO extends PartialType(
  ListTransactionsFieldsPaginationDTO,
) {
  @ApiPropertyOptional({
    enum: SortingAttribute,
    default: SortingAttribute.PAYMENT_DATE,
  })
  @IsOptional()
  @IsEnum(SortingAttribute, {
    message: `The value of the field 'sort' must be one of the following: ${Object.values(
      SortingAttribute,
    ).join(', ')}`,
  })
  sort?: SortingAttribute;

  @ApiPropertyOptional({ enum: SortingOrder, default: SortingOrder.DESCENDING })
  @IsOptional()
  @IsEnum(SortingOrder, {
    message: `The value of the field 'order' must be one of the following: ${Object.values(
      SortingOrder,
    ).join(', ')}`,
  })
  order?: SortingOrder;

  @IsNumber()
  @Max(12)
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 12 })
  month?: number;

  @IsNumber()
  @Max(9999)
  @Min(1000)
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number, minLength: 4, maxLength: 4 })
  year?: number;
}
