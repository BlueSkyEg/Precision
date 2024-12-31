import { Component, inject, OnInit } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { IncomesComponent } from "./incomes/incomes.component";
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';
import { ChooseBusinessComponent } from "../../choose-business/choose-business.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    TopNavComponent,
    NavigationIconComponent,
    ChartModule,
    TabViewModule,
    IncomesComponent,
    TabsComponent,
    BarChartComponent,
    ChooseBusinessComponent
  ],
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  //bread Crumbs
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Client', routerLink: '/insights/dashboard/client-dashboard' },
  ];

  //tabs
  clientTabs: string[] = ['Net income', 'Expenses ', 'Gross profit'];
  selectedTab: string = 'Net income';
  selectTabClient(tab: string) {
    this.selectedTab = tab;
  }
  //Injected Services
  private _DashboardService: DashboardService = inject(DashboardService);
  private _DropdownStateService: DropdownStateService = inject(DropdownStateService);

  selectedBusiness: IBusinesses | null = null;
  isBusinessSelected: boolean = false;

  //business id getter
  get businessId() {
    if (this.selectedBusiness) {
      return this.selectedBusiness.companyId;
    }
    return '';
  }
  //analysis number
  awaitingTrx: number = 0;
  expensesTotal: number = 0;
  expensesRate: number = 0;
  grossProfitTotal: number = 0;
  grossProfitRate: number = 0;
  netIncomeTotal: number = 0;
  netIncomeRate: number = 0;
  pendingTrx: number = 0;


  ngOnInit() {
    this._DropdownStateService.selectedBusiness$.subscribe((business) => {
      this.selectedBusiness = business;
      this.isBusinessSelected = business !== null;

      if (this.isBusinessSelected) {
        this.getBusinessAnalysis()
      }
    });
  }
  getBusinessAnalysis() {
    this._DashboardService.getBusinessAnalysis(this.businessId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.grossProfitRate = response.data.grossProfitRate;
        this.expensesRate = response.data.expensesRate;
        this.netIncomeRate = response.data.netIncomeRate;
        this.awaitingTrx = response.data.awaitingTrx;
        this.pendingTrx = response.data.pendingTrx;
        this.expensesTotal = response.data.expensesList[12];
        this.grossProfitTotal = response.data.grossProfitList[12];
        this.netIncomeTotal = response.data.netIncomeList[12];
        //this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching business', err);
      },

    });
  }
}
