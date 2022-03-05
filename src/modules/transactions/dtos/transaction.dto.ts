import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { UserDTO } from '@modules/users/dtos/user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TransactionType } from '../enums/transaction-type.enum';

export class TransactionDTO {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsEnum(TransactionType)
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

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ default: new Date() })
  paymentDate?: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  paid: boolean;

  user: UserDTO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
