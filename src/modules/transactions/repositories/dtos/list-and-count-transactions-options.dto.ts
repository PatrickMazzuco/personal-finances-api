import { SortingOrder } from '@src/shared/enums/sorting-order.enum';

import { ListTransactionsFiltersDTO } from './list-and-count-transactions-filters.dto';

export class ListAndCountTransactionsOptionsDTO {
  filters?: ListTransactionsFiltersDTO;
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortingOrder;
}
