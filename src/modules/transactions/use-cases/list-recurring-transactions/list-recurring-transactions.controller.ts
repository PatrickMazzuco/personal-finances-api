import { Request } from 'express';

import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { RecurringTransactionDTO } from '@modules/transactions/dtos/recurring-transaction.dto';
import { User } from '@modules/users/entities/user.entity';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { paginate } from '@src/adapters/PaginationAdapter';

import { ListRecurringTransactionsQueryDTO } from './dtos/list-recurring-transactions-query.dto';
import { ListRecurringTransactionsResponseDTO } from './dtos/list-recurring-transactions-response.dto';
import { ListRecurringTransactionsService } from './list-recurring-transactions.service';

@ApiTags('recurring-transactions')
@Controller('recurring-transactions')
@JwtAuth()
export class ListRecurringTransactionsController {
  constructor(
    private readonly listRecurringTransactionsService: ListRecurringTransactionsService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recurring Transactions listed successfully',
    type: ListRecurringTransactionsResponseDTO,
  })
  async handle(
    @Req()
    request: Request,
    @AuthUser()
    user: User,
    @Query() { page: pageQuery, ...query }: ListRecurringTransactionsQueryDTO,
  ): Promise<ListRecurringTransactionsResponseDTO> {
    const limit = Number(this.configService.get('PAGINATION_LIMIT')) || 10;
    const page = Number(pageQuery) || 1;

    const transactions = await this.listRecurringTransactionsService.execute(
      {
        userId: user.id,
        ...query,
      },
      {
        limit,
        page,
      },
    );

    const paginatedResponse = paginate<RecurringTransactionDTO>({
      data: transactions.data,
      totalItems: transactions.count,
      limit,
      page,
      request,
    });

    return paginatedResponse;
  }
}
