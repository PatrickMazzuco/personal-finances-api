import { JwtAuthGuard } from '@modules/auth/guards/jwt.guard';
import { TransactionDTO } from '@modules/transactions/dtos/transaction.dto';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { paginate } from '@src/adapters/PaginationAdapter';
import { AuthenticatedRequest } from '@src/shared/dtos/authenticated-request.dto';

import { ListTransactionsQueryDTO } from './dtos/list-transactions-query.dto';
import { ListTransactionsResponseDTO } from './dtos/list-transactions-response.dto';
import { ListTransactionsService } from './list-transactions.service';

@ApiTags('transactions')
@Controller('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
    request: AuthenticatedRequest,
    @Query() { page: pageQuery, ...query }: ListTransactionsQueryDTO,
  ): Promise<ListTransactionsResponseDTO> {
    const limit = Number(this.configService.get('PAGINATION_LIMIT')) || 10;
    const page = Number(pageQuery) || 1;

    const transactions = await this.listTransactionsService.execute(
      {
        userId: request.user.id,
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
