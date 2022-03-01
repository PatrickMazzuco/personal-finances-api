export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc',
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export function translateSortingOrder(order: SortingOrder): 'ASC' | 'DESC' {
  switch (order) {
    case SortingOrder.ASC:
    case SortingOrder.ASCENDING:
      return 'ASC';
    case SortingOrder.DESC:
    case SortingOrder.DESCENDING:
      return 'DESC';
    default:
      return undefined;
  }
}
