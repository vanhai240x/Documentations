import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IDynamicFilter {
  pagination: {
    pageSize: number;
    pageNumber: number;
    isPaging: boolean;
  };
  groupFilters: {
    filters: {
      operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'fc';
      field: string;
      value: string;
    }[];
    logic: { value: 'or' | 'and' };
  }[];
  sort: {
    predicate: string;
    reverse: boolean;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class FinancesPlanningService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  getFinancesPlanning(paging?: any, groupFilters?: any, sort?: any) {
    let body: IDynamicFilter = {
      pagination: paging,
      groupFilters: groupFilters,
      sort: sort,
    };
    return this.httpClient.post(`link-api-here`, body);
  }
}
