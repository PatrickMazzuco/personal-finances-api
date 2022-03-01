import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { CreateTransactionDTO } from '@modules/transactions/use-cases/create-transaction/dtos/create-transaction.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTransactionService } from './create-transaction.service';

@Controller('transactions')
@ApiTags('transactions')
export class CreateTransactionController {
  constructor(
    private readonly createTransactionService: CreateTransactionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Transaction created',
    type: TransactionDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This email is already in use',
    type: HttpExceptionDTO,
  })
  async handle(@Body() data: CreateTransactionDTO): Promise<TransactionDTO> {
    return this.createTransactionService.execute(data);
  }
}
