import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { User } from '@modules/users/entities/user';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FindTransactionParamsDTO } from './dtos/find-transaction-params.dto';
import { FindTransactionService } from './find-transaction.service';

@Controller('transactions')
@ApiTags('transactions')
@JwtAuth()
export class FindTransactionController {
  constructor(
    private readonly findTransactionService: FindTransactionService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction found',
    type: TransactionDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
    type: HttpExceptionDTO,
  })
  async handle(
    @AuthUser() user: User,
    @Param() params: FindTransactionParamsDTO,
  ): Promise<TransactionDTO> {
    return this.findTransactionService.execute({
      ...params,
      userId: user.id,
    });
  }
}
