import { CommonModule } from '@angular/common';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OverlayComponent } from 'app/shared/components/transactions/overlay/overlay.component';
import { ModalComponent } from 'app/shared/components/modal/modal.component';
import { TabsComponent } from 'app/shared/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from 'app/shared/components/custome-table/custom-table.component';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    TopNavComponent,
    CommonModule,
    CommonModule,
    OverlayComponent,
    ModalComponent,
    TabsComponent,
    FormsModule,
    CustomTableComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Transactions', routerLink: '/insights/transactions' },
  ];
  transactionTabs: string[] = ['Pending', 'Updated', 'History'];
  selectedTab: string = 'Pending';
  filterVisible: boolean = false;

  //choose account
  selectedAccountsCount: number = 0;
  transactions: any[] = [
    {
      name: 'Diallo Restaurant Hub LLC',
      date: new Date('2024-11-22'),
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Withdrawal',
      amount: 19, // Changed to a number
      comment: 'Lorem ipsum dolor sit amet.',
    },
    {
      name: 'Green Valley Market',
      date: new Date('2023-12-14'),
      amount: 2540.0, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:2',
      type: 'Deposit',
      account: 'Wells Fargo - 8765',
      comment: 'Business payment received.',
    },
    {
      name: 'Urban Eats',
      date: new Date('2024-10-05'),
      amount: 1200.75, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:3',
      type: 'Withdrawal',
      account: 'Bank of America - 1234',
      comment: 'Monthly operational expenses.',
      country: 'France',
    },
    {
      name: 'Sunshine Bakery',
      date: new Date('2023-03-20'),
      amount: 750.5, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:4',
      type: 'Deposit',
      account: 'Chase Bank - 9876',
      comment: 'Client payment for catering.',
      country: 'Germany',
    },
    {
      name: 'Tech Solutions Inc.',
      date: new Date('2003-08-04'),
      amount: 5500.0, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:5',
      type: 'Withdrawal',
      account: 'HSBC - 3333',
      comment: 'Technology services and support.',
      country: 'United States',
    },
    {
      name: 'Fashion Forward',
      date: new Date('2023-04-55'),
      amount: 3550.25, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:5',
      type: 'Deposit',
      account: 'Citi Bank - 4444',
      comment: 'Client payment for merchandise.',
      country: 'Canada',
    },
    {
      name: 'Global Supplies Ltd.',
      date: new Date('2023-05-02'),
      amount: 8300.5, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:6',
      type: 'Withdrawal',
      account: 'Standard Chartered - 5555',
      comment: 'Bulk purchase of materials.',
      country: 'France',
    },
    {
      name: 'Foodies Corner',
      date: new Date('2023-05-18'),
      amount: 1050.75, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:7',
      type: 'Deposit',
      account: 'Bank of America - 6666',
      comment: 'Monthly subscription fees.',
      country: 'Germany',
    },
    {
      name: 'Wellness Clinic',
      date: new Date('2023-06-07'),
      amount: 2780.6, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:9',
      type: 'Withdrawal',
      account: 'US Bank - 7777',
      comment: 'Medical supplies restocking.',
      country: 'United States',
    },
    {
      name: 'Eco Living',
      date: new Date('2023-06-25'),
      amount: 3925.0, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Deposit',
      account: 'Chase Bank - 8888',
      comment: 'Sale of eco-friendly products.',
      country: 'Canada',
    },
    {
      name: 'Education First',
      date: new Date('2023-07-10'),
      amount: 4500.0, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Withdrawal',
      account: 'Wells Fargo - 9999',
      comment: 'Education supplies purchase.',
      country: 'France',
    },
    {
      name: 'Sports Hub',
      date: new Date('2023-07-21'),
      amount: 1275.4, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Deposit',
      account: 'HSBC - 1111',
      comment: 'Client payment for equipment.',
      country: 'Germany',
    },
    {
      name: 'Health Plus',
      date: new Date('2023-08-05'),
      amount: 2850.75, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Withdrawal',
      account: 'Citi Bank - 2222',
      comment: 'Monthly medical supplies.',
      country: 'United States',
    },
    {
      name: 'Cafe Delights',
      date: new Date('2023-08-19'),
      amount: 920.5, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Deposit',
      account: 'Bank of America - 3333',
      comment: 'Catering services payment.',
      country: 'Canada',
    },
    {
      name: 'Build It',
      date: new Date('2023-09-01'),
      amount: 6150.3, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Withdrawal',
      account: 'Standard Chartered - 4444',
      comment: 'Construction material purchase.',
      country: 'France',
    },
    {
      name: 'Gourmet Meals',
      date: new Date('2023-09-14'),
      amount: 1340.25, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Deposit',
      account: 'US Bank - 5555',
      comment: 'Monthly subscription fees.',
      country: 'Germany',
    },
    {
      name: 'Tech Innovators',
      date: new Date('2023-10-03'),
      amount: 7850.0, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Withdrawal',
      account: 'Chase Bank - 6666',
      comment: 'New software purchase.',
      country: 'United States',
    },
    {
      name: 'The Green Thumb',
      date: new Date('2023-10-21'),
      amount: 1150.75, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Deposit',
      account: 'Wells Fargo - 7777',
      comment: 'Client payment for services.',
      country: 'Canada',
    },
    {
      name: 'Mindful Medics',
      date: new Date('2023-11-04'),
      amount: 3450.8, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Withdrawal',
      account: 'Bank of America - 8888',
      comment: 'Medical equipment purchase.',
      country: 'France',
    },
    {
      name: 'Blue Skies Travels',
      date: new Date('2023-11-20'),
      amount: 2750.6, // Changed to a number
      selected: false,
      chk: '-',
      source: '	PNC CHK - 3775',
      option: 'option:1',
      type: 'Deposit',
      account: 'HSBC - 9999',
      comment: 'Client payment for packages.',
      country: 'Germany',
    },
  ];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  //MODAL
  openFilter() {
    this.filterVisible = true;
  }
  closeFilter(event?: Event) {
    this.filterVisible = false;
    event?.preventDefault();
  }
}
