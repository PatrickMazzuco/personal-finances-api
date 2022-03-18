import { SortingOrder } from '@src/shared/enums/sorting-order.enum';

import { ListRecurringTransactionsFiltersDTO } from './list-and-count-recurring-transactions-filters.dto';

export class ListAndCountRecurringTransactionsOptionsDTO {
  filters?: ListRecurringTransactionsFiltersDTO;
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortingOrder;
}
