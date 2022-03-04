import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { User } from '@modules/users/entities/user';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeleteTransactionService } from './delete-transaction.service';
import { DeleteTransactionParamsDTO } from './dtos/delete-transaction-params.dto';

@Controller('transactions')
@ApiTags('transactions')
@JwtAuth()
export class DeleteTransactionController {
  constructor(
    private readonly deleteTransactionService: DeleteTransactionService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction removed',
    type: TransactionDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
    type: HttpExceptionDTO,
  })
  async handle(
    @AuthUser() user: User,
    @Param() params: DeleteTransactionParamsDTO,
  ): Promise<void> {
    return this.deleteTransactionService.execute({
      ...params,
      userId: user.id,
    });
  }
}
