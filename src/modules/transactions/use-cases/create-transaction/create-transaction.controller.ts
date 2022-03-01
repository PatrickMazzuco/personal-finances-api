import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '@src/shared/dtos/authenticated-request.dto';

import { CreateTransactionService } from './create-transaction.service';
import { CreateTransactionBodyDTO } from './dtos/create-transaction-body.dto';

@Controller('transactions')
@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    @Req() request: AuthenticatedRequest,
    @Body() data: CreateTransactionBodyDTO,
  ): Promise<TransactionDTO> {
    return this.createTransactionService.execute({
      ...data,
      userId: request.user.id,
    });
  }
}
