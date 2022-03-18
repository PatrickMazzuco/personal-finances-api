import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { User } from '@modules/users/entities/user.entity';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FindRecurringTransactionParamsDTO } from './dtos/find-recurring-transaction-params.dto';
import { FindRecurringTransactionService } from './find-recurring-transaction.service';

@Controller('recurring-transactions')
@ApiTags('recurring-transactions')
@JwtAuth()
export class FindRecurringTransactionController {
  constructor(
    private readonly findRecurringTransactionService: FindRecurringTransactionService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recurring Transaction found',
    type: RecurringTransactionDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurring Transaction not found',
    type: HttpExceptionDTO,
  })
  async handle(
    @AuthUser() user: User,
    @Param() params: FindRecurringTransactionParamsDTO,
  ): Promise<RecurringTransactionDTO> {
    return this.findRecurringTransactionService.execute({
      ...params,
      userId: user.id,
    });
  }
}
