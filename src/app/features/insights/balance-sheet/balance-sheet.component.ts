import { Component, inject } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgClass } from '@angular/common';
import { CompareComponent } from 'app/shared/components/compare/compare.component';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { InsightsReportsService } from 'app/core/services/InsightsReports/insights-reports.service';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';
import { PsYear } from 'app/shared/interfaces/insights/ps-year';
import { BalanceSheetTableComponent } from "./balance-sheet-table/balance-sheet-table.component";
import { ChooseBusinessComponent } from "../choose-business/choose-business.component";

@Component({
  selector: 'app-balance-sheet',
  standalone: true,
  imports: [
    TopNavComponent,
    DropdownComponent,
    MatNativeDateModule,
    CommonModule,
    CompareComponent,
    BalanceSheetTableComponent,
    ChooseBusinessComponent
  ],
  templateUrl: './balance-sheet.component.html',
})
export class BalanceSheetComponent {
  options: any[] = ['export as pdf', 'export as svg ', 'option 4444444444'];

  //table data
  yearlyPsReport: PsYear[] | null = null;
  selectedBusiness: IBusinesses | null = null;
  isBusinessSelected: boolean = false;

  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Balance Sheet', routerLink: '/insights/balance-sheet' },
  ];

  //Injected services
  private dropdownStateService: DropdownStateService = inject(DropdownStateService);
  private reportsService: InsightsReportsService = inject(InsightsReportsService);

  ngOnInit(): void {
    // Subscribe to the selected business state
    this.dropdownStateService.selectedBusiness$.subscribe((business) => {
      this.selectedBusiness = business;
      this.isBusinessSelected = business !== null;

      if (this.isBusinessSelected) {
        this.getYearlyPsReport();
        this.getYears()
      }
    });

  }

  //get yearsOption
  yearOptions: number[] = [];
  getYears() {
    if (this.businessId) {
      this.dropdownStateService.getYears(this.businessId).subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            console.log(data.data);
            this.yearOptions = data.data.slice(0, 5);

          }

        },
        error: (err) => console.error('Error:', err),
      });
    }
  }


  get businessId() {
    if (this.selectedBusiness) {
      return this.selectedBusiness.companyId;
    }
    return null;
  }

  getYearlyPsReport(): void {
    if (this.businessId) {
      this.reportsService.getYearlyPsReports(this.businessId).subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            console.log(data.data)
            this.yearlyPsReport = data.data;

          }

        },
        error: (err) => console.error('Error:', err),
      });
    }
  }
}
