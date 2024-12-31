import { Component, inject } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { CardAmountsComponent } from '../card-amounts/card-amounts.component';
import { TabsComponent } from 'app/shared/components/tabs/tabs.component';
import { CustomTableComponent } from 'app/shared/components/custom-table/custom-table.component';


@Component({
  selector: 'app-accountant',
  standalone: true,
  imports: [TopNavComponent, CardAmountsComponent, TabsComponent, CustomTableComponent],
  templateUrl: './accountant.component.html',
})
export class AccountantComponent {
  ngOnInit() {
    this.getAccountantById();
  }
  _DashboardService = inject(DashboardService);
  //breadcrumbs
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    {
      label: 'Accountant',
      routerLink: '/insights/dashboard/accountant-dashboard',
    },
  ];
  //tabs
  tabs: string[] = ['My Profile'];
  selectedTab: string = 'My Profile';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  //table Headers
  businessesTableHeader: any[] = [
    { Name: '-' },
    { Name: 'Name' },
    { Name: 'Owner' },
    { Name: 'Accountant' },
    { Name: 'Last update' },
    {
      Name: 'Pending', isSorted: true,
      colName: 'pendingTrxCount',
      sortOrder: '' as '' | 'asc' | 'desc',
    },
    {
      Name: 'Awaiting', isSorted: true,
      colName: 'awaitingTrxCount',
      sortOrder: '' as '' | 'asc' | 'desc',
    },
    {
      Name: 'Reviewed', isSorted: true,
      colName: 'reviewedTrxCount',
      sortOrder: '' as '' | 'asc' | 'desc',
    },

  ];
  businesses: any[] = [];
  totalBusiness: number = 0;
  totalPendingTransactions: number = 0;
  totalReviewedTransactions: number = 0;
  totalBusinessWithPendingTransactions: number = 0;
  getAccountantById() {
    this._DashboardService.getProfileById('c4a6b1ce-4224-460c-ad90-3eafddb32d9a').subscribe({
      next: (response) => {
        console.log(response.data)
        this.businesses = response.data;
        this.totalBusiness = response.data.length;
        this.totalReviewedTransactions = this.businesses.reduce(
          (sum: any, user: any) => sum + (user.reviewedTrxCount || 0),
          0
        );
        this.totalPendingTransactions = this.businesses.reduce(
          (sum: any, user: any) => sum + (user.pendingTrxCount || 0),
          0
        );
        this.totalBusinessWithPendingTransactions = this.businesses.reduce(
          (count: any, user: any) => count + (user.pendingTrxCount > 0 ? 1 : 0), 0
        )

      },
    });
  }
}
