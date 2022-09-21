import { OnInit } from '@angular/core';
import { FinancesPlanningService } from "./services/finances-planning.service";

export class FinancesPlanningListComponent implements OnInit {

  paging = {
    page: 1,
    limit: 10,
    total: 0,
  };
  groupFilters: any = [];
  sort: any = {};

  constructor(
    private financesPlanningService: FinancesPlanningService
  ) { }

  ngOnInit(): void {
    this.getFinancesPlanning();
  }

  /**********************
    Start Init Data
  ***********************/
  getFinancesPlanning() {
    this.financesPlanningService
      .getFinancesPlanning(this.paging, this.groupFilters, this.sort)
      .subscribe(
        (result: any) => {
          console.log(result);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
