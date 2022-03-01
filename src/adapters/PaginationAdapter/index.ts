import { Request } from 'express';

import { PaginationAdapterDTO } from './dtos/pagination-adapter.dto';

interface IPaginationOptions<T> {
  page: number;
  limit: number;
  data: T[];
  totalItems: number;
  request: Request;
}

function parseQuery(query: { [key: string]: unknown }) {
  return Object.keys(query)
    .map(queryKey => `${queryKey}=${query[queryKey]}`)
    .join('&');
}

export function paginate<T>({
  data,
  limit,
  totalItems,
  page,
  request,
}: IPaginationOptions<T>): PaginationAdapterDTO<T> {
  const host = `${request.protocol}://${request.get('host')}${request.path}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page: _, ...query } = request.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const filter = parseQuery(query);

  const links = {
    first: `${host}?page=1${filter ? `&${filter}` : ''}`,
    last: `${host}?page=${totalItems > 0 ? Math.ceil(totalItems / limit) : 1}${
      filter ? `&${filter}` : ''
    }`,
  };

  if (endIndex < totalItems) {
    Object.assign(links, {
      next: `${host}?page=${page + 1}${filter ? `&${filter}` : ''}`,
    });
  }

  if (startIndex > 0) {
    Object.assign(links, {
      previous: `${host}?page=${page - 1}${filter ? `&${filter}` : ''}`,
    });
  }

  return {
    data,
    meta: {
      itemCount: data.length,
      totalItems,
      itemsPerPage: Number(limit),
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    },
    links,
  };
}
