import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { User } from '@modules/users/entities/user.entity';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTransactionService } from './create-transaction.service';
import { CreateTransactionBodyDTO } from './dtos/create-transaction-body.dto';

@Controller('transactions')
@ApiTags('transactions')
@JwtAuth()
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
  async handle(
    @AuthUser() user: User,
    @Body() data: CreateTransactionBodyDTO,
  ): Promise<TransactionDTO> {
    return this.createTransactionService.execute({
      ...data,
      userId: user.id,
    });
  }
}
