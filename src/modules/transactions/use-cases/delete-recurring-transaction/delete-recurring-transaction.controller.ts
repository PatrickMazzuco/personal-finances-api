import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { User } from '@modules/users/entities/user.entity';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeleteRecurringTransactionService } from './delete-recurring-transaction.service';
import { DeleteRecurringTransactionParamsDTO } from './dtos/delete-recurring-transaction-params.dto';

@Controller('recurring-transactions')
@ApiTags('recurring-transactions')
@JwtAuth()
export class DeleteRecurringTransactionController {
  constructor(
    private readonly deleteRecurringTransactionService: DeleteRecurringTransactionService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Recurring Transaction removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurring Transaction not found',
    type: HttpExceptionDTO,
  })
  async handle(
    @AuthUser() user: User,
    @Param() params: DeleteRecurringTransactionParamsDTO,
  ): Promise<void> {
    return this.deleteRecurringTransactionService.execute({
      ...params,
      userId: user.id,
    });
  }
}
