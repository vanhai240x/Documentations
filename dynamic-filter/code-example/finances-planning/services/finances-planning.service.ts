import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FinancesPlanningService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  getFinancesPlanning(paging?: any, groupFilters?: any, sort?: any) {
    let body = {
      pagination: paging,
      groupFilters: groupFilters,
      sort: sort,
    };
    return this.httpClient.post(`link-api-here`, body);
  }
}
