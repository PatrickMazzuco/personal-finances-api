import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { User } from '@modules/users/entities/user.entity';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRecurringTransactionService } from './create-recurring-transaction.service';
import { CreateRecurringTransactionBodyDTO } from './dtos/create-recurring-transaction-body.dto';

@Controller('recurring-transactions')
@ApiTags('recurring-transactions')
@JwtAuth()
export class CreateRecurringTransactionController {
  constructor(
    private readonly createRecurringTransactionService: CreateRecurringTransactionService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Recurring Transaction created',
    type: RecurringTransactionDTO,
  })
  async handle(
    @AuthUser() user: User,
    @Body() data: CreateRecurringTransactionBodyDTO,
  ): Promise<RecurringTransactionDTO> {
    return this.createRecurringTransactionService.execute({
      ...data,
      userId: user.id,
    });
  }
}
