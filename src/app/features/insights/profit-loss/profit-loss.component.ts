import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { CompareComponent } from 'app/shared/components/compare/compare.component';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { TabsComponent } from 'app/shared/components/tabs/tabs.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { IBusinesses } from 'app/shared/interfaces/insights/ibusinesses';
import { InsightsReportsService } from 'app/core/services/InsightsReports/insights-reports.service';
import { PlYear } from 'app/shared/interfaces/insights/pl-year';
import { ReportTableComponent } from "../../../shared/components/report-table/report-table.component";
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-profit-loss',
  standalone: true,
  imports: [TopNavComponent, TabsComponent, DropdownComponent, CompareComponent, CommonModule, ReportTableComponent, NavigationIconComponent],
  templateUrl: './profit-loss.component.html',
})
export class ProfitLossComponent implements OnInit {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Profit & loos', routerLink: '/insights/profit-loos' },
  ];
  //tabs
  profitAndLossTabs: string[] = ['Monthly', 'Yearly'];
  selectedTab: string = 'Monthly';
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  //compare and exportsAs
  toggleOptions: any[] = ['2012', '2013 ', '2014'];
  isDropdownOpen = false;
  isCompare = false;
  isShowResults = false;
  options: any[] = ['export as pdf', 'export as svg ', 'option 4444444444'];
  //percentage
  isPercentage: boolean = false;

  //table data
  dropdownVisibility: { [key: string]: boolean } = {};  //exportdropdown
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthlyReport: PlYear[] | null = null;
  yearlyReport: PlYear[] | null = null;
  selectedBusiness: IBusinesses | null = null;
  isBusinessSelected: boolean = false;



  onYearChange(selectedYear: any): void {
    this.selectedYear = selectedYear;
    this.getMonthlyReport();
  }
  //Injected services
  private dropdownStateService: DropdownStateService = inject(DropdownStateService);
  private reportsService: InsightsReportsService = inject(InsightsReportsService);

  ngOnInit(): void {
    // Subscribe to the selected business state
    this.dropdownStateService.selectedBusiness$.subscribe((business) => {
      this.selectedBusiness = business;
      this.isBusinessSelected = business !== null;

      if (this.isBusinessSelected) {
        this.getMonthlyReport();
        this.getYearlyReport();
        this.getYears()
      }
    });

  }
  //get years for each company
  //get yearsOption
  yearOptions: number[] = [];
  selectedYear: number = this.yearOptions[0];
  getYears() {
    if (this.businessId) {
      this.dropdownStateService.getYears(this.businessId).subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            console.log(data.data);
            this.yearOptions = data.data;
            this.selectedYear = this.yearOptions[0];

          }

        },
        error: (err) => console.error('Error:', err),
      });
    }
  }
  //table data
  toggleDropDown(reportId: number): void {
    this.dropdownVisibility[reportId] = !this.dropdownVisibility[reportId];
  }

  isDropdownVisible(reportId: number): boolean {
    return this.dropdownVisibility[reportId] || false;
  }


  get businessId() {
    if (this.selectedBusiness) {
      return this.selectedBusiness.companyId;
    }
    return null;
  }
  getMonthlyReport(): void {
    if (this.businessId) {
      this.reportsService.getMonthlyReports(this.businessId, this.selectedYear).subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            console.log(data.data)
            this.monthlyReport = data.data;

          }

        },
        error: (err) => console.error('Error:', err),
      });
    }
  }
  getYearlyReport(): void {
    if (this.businessId) {
      this.reportsService.getYearlyReports(this.businessId, this.yearOptions.length).subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            console.log(data)
            this.yearlyReport = data.data;

          }

        },
        error: (err) => console.error('Error:', err),
      });
    }
  }


  //percentage
  togglePercentage() {
    this.isPercentage = !this.isPercentage;
    this.selectedTab === ''
  }
}
