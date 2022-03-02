import { HttpExceptionDTO } from '@errors/http-exception.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from '@src/shared/dtos/authenticated-request.dto';

import { FindTransactionParamsDTO } from './dtos/find-transaction-params.dto';
import { FindTransactionService } from './find-transaction.service';

@Controller('transactions')
@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    @Req() request: AuthenticatedRequest,
    @Param() params: FindTransactionParamsDTO,
  ): Promise<TransactionDTO> {
    return this.findTransactionService.execute({
      ...params,
      userId: request.user.id,
    });
  }
}
