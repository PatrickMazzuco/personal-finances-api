import { Request } from 'express';

import { AuthUser } from '@decorators/auth-user.decorator';
import { JwtAuth } from '@decorators/auth.decorator';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import { User } from '@modules/users/entities/user';
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

import { ListTransactionsQueryDTO } from './dtos/list-transactions-query.dto';
import { ListTransactionsResponseDTO } from './dtos/list-transactions-response.dto';
import { ListTransactionsService } from './list-transactions.service';

@ApiTags('transactions')
@Controller('transactions')
@JwtAuth()
export class ListTransactionsController {
  constructor(
    private readonly listTransactionsService: ListTransactionsService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transactions listed successfully',
    type: ListTransactionsResponseDTO,
  })
  async handle(
    @Req()
    request: Request,
    @AuthUser()
    user: User,
    @Query() { page: pageQuery, ...query }: ListTransactionsQueryDTO,
  ): Promise<ListTransactionsResponseDTO> {
    const limit = Number(this.configService.get('PAGINATION_LIMIT')) || 10;
    const page = Number(pageQuery) || 1;

    const transactions = await this.listTransactionsService.execute(
      {
        userId: user.id,
        ...query,
      },
      {
        limit,
        page,
      },
    );

    const paginatedResponse = paginate<TransactionDTO>({
      data: transactions.data,
      totalItems: transactions.count,
      limit,
      page,
      request,
    });

    return paginatedResponse;
  }
}
