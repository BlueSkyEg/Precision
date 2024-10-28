import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { TableComponent } from 'app/shared/components/table/table.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';
import { ITab } from 'app/shared/interfaces/insights/itab';
import { IUser } from 'app/shared/interfaces/insights/iuser';

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
    this.getAccountants();
    this.getClients();
    this.getBusinesses();
  }
  selectTab(index: number) {
    if (index !== 2 && this.isBusinessFiltered) {
      // Reset the filter and fetch all businesses if leaving the 'Businesses' tab
      this.isBusinessFiltered = false;
      this.getBusinesses();
    }
    this.selectedTabIndex = index;
    // Optionally, update transaction counts for the selected tab
    this.updateTransactionCounts(this.tabs[index].users);
  }
  getAccountants() {
    this._DashboardService.getProfiles().subscribe({
      next: (response) => {
        this.getBusinesses();
        this.tabs[0].users = response.data.items;
        this.tabs[0].count = this.tabs[0].users.length;
        if (this.selectedTabIndex === 0)
          this.updateTransactionCounts(this.tabs[0].users);
      },
    });
  }

  getClients() {
    this._DashboardService.getClients().subscribe({
      next: (response) => {
        this.getBusinesses();
        this.tabs[1].users = response.data.items;
        this.tabs[1].count = this.tabs[1].users.length;
        if (this.selectedTabIndex === 1)
          this.updateTransactionCounts(this.tabs[1].users);
      },
    });
  }

  getBusinesses() {
    this._DashboardService.getbusinesses().subscribe({
      next: (response) => {
        this.tabs[2].users = response.data.items;
        this.tabs[2].count = this.tabs[2].users.length;
        if (this.selectedTabIndex === 2)
          this.updateTransactionCounts(this.tabs[2].users);
      },
    });
  }
  getBusinessById(userId: string, userType: string) {
    console.log('User Type:', userType); // Debugging line to check userType value
    this.isBusinessFiltered = true;

    if (userType === 'client') {
      this._DashboardService.getClientById(userId).subscribe({
        next: (response) => {
          this.tabs[1].users = response.data;
          this.tabs[1].count = this.tabs[1].users.length;
          this.updateTransactionCounts(this.tabs[1].users);
          this.selectedTabIndex = 1;
        },
      });
    } else {
      console.log('Fetching profile by ID:', userId);
      this._DashboardService.getProfileById(userId).subscribe({
        next: (response) => {
          this.tabs[2].users = response.data;
          this.tabs[2].count = this.tabs[2].users.length;
          this.updateTransactionCounts(this.tabs[2].users);
          this.selectedTabIndex = 2;
        },
      });
    }
  }

  updateTransactionCounts(users: IUser[]) {
    this.pending = users.reduce(
      (total, user) => total + user.pendingTrxCount,
      0
    );
    this.awaiting = users.reduce(
      (total, user) => total + user.awaitingTrxCount,
      0
    );
    this.reviewed = users.reduce(
      (total, user) => total + user.reviewedTrxCount,
      0
    );
  }
}
