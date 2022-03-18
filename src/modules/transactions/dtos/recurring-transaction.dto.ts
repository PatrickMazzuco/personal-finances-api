import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';

import { UserDTO } from '@modules/users/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';

import { TransactionType } from '../enums/transaction-type.enum';

export class RecurringTransactionDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsEnum(TransactionType, {
    message: `The value of the field 'type' must be one of the following: ${Object.values(
      TransactionType,
    ).join(', ')}`,
  })
  @IsNotEmpty()
  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(31)
  @IsNotEmpty()
  @ApiProperty({ type: Number, minimum: 1, maximum: 31 })
  paymentDay: number;

  @ApiProperty()
  active?: boolean;

  user: UserDTO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
