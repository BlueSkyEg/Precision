import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { TableComponent } from 'app/shared/components/table/table.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';
import { ITab } from 'app/shared/interfaces/insights/itab';
import { IUser } from 'app/shared/interfaces/insights/iuser';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TopNavComponent, TotalTransactionsCardComponent, TableComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  _DashboardService = inject(DashboardService);
  isBusinessFiltered: boolean = false;
  selectedTabIndex = 0;
  pending = 0;
  awaiting = 0;
  reviewed = 0;
  userId: string = '';
  isLoading: boolean = true;
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Admin', routerLink: '/insights/dashboard/admin-dashboard' },
  ];

  tabs: ITab[] = [
    { title: 'Accountants', count: 0, users: [] },
    { title: 'Clients', count: 0, users: [] },
    { title: 'Businesses', count: 0, users: [] },
  ];

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.isLoading = true;
    forkJoin({
      accountants: this._DashboardService.getProfiles(),
      clients: this._DashboardService.getClients(),
      businesses: this._DashboardService.getbusinesses(),
    }).subscribe({
      next: ({ accountants, clients, businesses }) => {
        this.tabs[0].users = accountants.data.items;
        this.tabs[1].users = clients.data.items;
        this.tabs[2].users = businesses.data.items;

        this.tabs[0].count = this.tabs[0].users.length;
        this.tabs[1].count = this.tabs[1].users.length;
        this.tabs[2].count = this.tabs[2].users.length;

        this.updateTransactionCounts([
          ...this.tabs[0].users,
          ...this.tabs[1].users,
          ...this.tabs[2].users,
        ]);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data', err);
        this.isLoading = false;
      },
    });
  }

  selectTab(index: number) {
    if (index === 2 && !this.isBusinessFiltered) {
      this.getBusinesses();
    }
    this.selectedTabIndex = index;
    this.updateTransactionCounts(this.tabs[index].users);
  }

  getAccountants() {
    this._DashboardService.getProfiles().subscribe({
      next: (response) => {
        this.tabs[0].users = response.data.items;
        this.tabs[0].count = this.tabs[0].users.length;
        if (this.selectedTabIndex === 0) {
          this.updateTransactionCounts(this.tabs[0].users);
          this.isLoading = true;
        }
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
        this.tabs[1].users = response.data.items;
        this.tabs[1].count = this.tabs[1].users.length;
        if (this.selectedTabIndex === 1) {
          this.updateTransactionCounts(this.tabs[1].users);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching clients', err), (this.isLoading = false);
      },
    });
  }

  getBusinesses() {
    this.isLoading = true;
    this._DashboardService.getbusinesses().subscribe({
      next: (response) => {
        this.tabs[2].users = response.data.items;
        this.isLoading = false;

        this.tabs[2].count = this.tabs[2].users.length;
        if (this.selectedTabIndex === 2) {
          this.updateTransactionCounts(this.tabs[2].users);
        }
      },
      error: (err) => {
        console.error('Error fetching businesses', err);
        this.isLoading = false;
      },
    });
  }

  getBusinessById(userId: string, userType: string) {
    this.isLoading = true;
    this.isBusinessFiltered = true;
    this.tabs[2].users = [];
    this.tabs[2].count = 0;
    const request$ =
      userType === 'client'
        ? this._DashboardService.getClientById(userId)
        : this._DashboardService.getProfileById(userId);

    request$.subscribe({
      next: (response) => {
        this.tabs[2].users = response.data;
        this.tabs[2].count = this.tabs[2].users.length;
        this.updateTransactionCounts(this.tabs[2].users);
        this.selectedTabIndex = 2;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching business by ID', err);
        this.isLoading = false;
      },
    });
  }

  updateTransactionCounts(users: IUser[]) {
    this.pending = 0;
    this.awaiting = 0;
    this.reviewed = 0;

    for (const user of users) {
      this.pending += user.pendingTrxCount;
      this.awaiting += user.awaitingTrxCount;
      this.reviewed += user.reviewedTrxCount;
    }
  }
}
