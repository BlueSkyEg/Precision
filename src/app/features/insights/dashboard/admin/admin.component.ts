import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { ITab } from 'app/shared/interfaces/insights/tab-model';
import { IUser } from 'app/shared/interfaces/insights/user-model';
import { forkJoin } from 'rxjs';
import { CustomTableComponent } from "../../../../shared/components/custom-table/custom-table.component";
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { NavigationIconComponent } from "../../../../core/icons/navigation-icons/navigation-icon.component";
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TopNavComponent, CustomTableComponent, TabsComponent, NavigationIconComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  //injected services
  private _DashboardService: DashboardService = inject(DashboardService);
  private dropdownStateService: DropdownStateService = inject(DropdownStateService);
  private router: Router = inject(Router);
  //data
  accountants: any[] = [];
  clients: any[] = [];
  businesses: any[] = [];
  totalPendingTransactions: number = 0;
  totalAwaitingTransactions: number = 0;
  totalReviewedTransactions: number = 0;
  totalAmounts: number = 0;
  isLoading: boolean = true;
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Admin', routerLink: '/insights/dashboard/admin-dashboard' },
  ];
  //business
  selectedBusiness: IBusinesses | null = null;

  ngOnInit() {
    // Subscribe to the selected business state

    this.getProfiles();
    this.getClients();
    this.getBusinesses();
  }
  getProfiles() {
    this._DashboardService.getProfiles().subscribe({
      next: (response) => {
        this.accountants = response.data;
        this.totalAmounts = this.accountants.length;
        this.totalPendingTransactions = this.accountants.reduce(
          (sum, user) => sum + (user.pendingTrxCount || 0),
          0
        );
        this.totalAwaitingTransactions = this.accountants.reduce(
          (sum, user) => sum + (user.awaitingTrxCount || 0),
          0
        );
        this.totalReviewedTransactions = this.accountants.reduce(
          (sum, user) => sum + (user.reviewedTrxCount || 0),
          0
        );


        //this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching accountants', err);
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
  getClients() {
    this._DashboardService.getClients().subscribe({
      next: (response) => {
        this.clients = response.data;
        this.totalAmounts = this.clients.length;
        this.totalPendingTransactions = this.clients.reduce(
          (sum, user) => sum + (user.pendingTrxCount || 0),
          0
        );
        this.totalAwaitingTransactions = this.clients.reduce(
          (sum, user) => sum + (user.awaitingTrxCount || 0),
          0
        );
        this.totalReviewedTransactions = this.clients.reduce(
          (sum, user) => sum + (user.reviewedTrxCount || 0),
          0
        );

        //this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching accountants', err);
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
  getBusinesses() {
    this._DashboardService.getbusinesses().subscribe({
      next: (response) => {
        this.businesses = response.data;
        this.totalAmounts = this.businesses.length;
        this.totalPendingTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.pendingTrxCount || 0),
          0
        );
        this.totalAwaitingTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.awaitingTrxCount || 0),
          0
        );
        this.totalReviewedTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.reviewedTrxCount || 0),
          0
        );

        //this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching accountants', err);
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
  getBusinessesByProfileId(id: string) {
    this._DashboardService.getProfileById(id).subscribe({
      next: (response) => {
        this.businesses = response.data;
        this.totalPendingTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.pendingTrxCount || 0),
          0
        );
        this.totalAwaitingTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.awaitingTrxCount || 0),
          0
        );
        this.totalReviewedTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.reviewedTrxCount || 0),
          0
        );

        //this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching accountants', err);
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
  getBusinessesByClientId(id: string) {
    this._DashboardService.getClientById(id).subscribe({
      next: (response) => {
        this.businesses = response.data;
        this.totalPendingTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.pendingTrxCount || 0),
          0
        );
        this.totalAwaitingTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.awaitingTrxCount || 0),
          0
        );
        this.totalReviewedTransactions = this.businesses.reduce(
          (sum, user) => sum + (user.reviewedTrxCount || 0),
          0
        );

        //this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching getBusinessesByClientId', err);
        this.isLoading = false;
      },
      complete: () => (this.isLoading = false),
    });
  }
  //user Id Received from Child
  handleUserId(event: { userId: string, type: string }): void {
    if (event.type === 'user') {
      this.getBusinessesByProfileId(event.userId); this.selectedTab = 'Businesses';
    }
    else if (event.type === 'client') {
      this.getBusinessesByClientId(event.userId); this.selectedTab = 'Businesses';
    }
  }
  //user Id Received from Child
  handlecompany(item: any): void {
    this.dropdownStateService.setSelectedBusiness(item);
    this.router.navigate(['insights/transactions']);
  }

  tableHeader: any[] = [
    { Name: '-' },
    { Name: 'Name' },
    {
      Name: 'Companies', isSorted: true,
      colName: 'companiesCount',
      sortOrder: '' as '' | 'asc' | 'desc',
    },
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
  //tabs
  adminTabs: string[] = ['Accountants', 'Clients', 'Businesses'];
  selectedTab: string = 'Accountants';
  selectTabAdmin(tab: string) {
    if (tab === 'Accountants') {
      this.getProfiles();
      console.log('Accountants')
    }
    else if (tab === 'Clients') {
      this.getClients();
    }
    else {
      this.getBusinesses();
    }
    this.selectedTab = tab;
  }
}
