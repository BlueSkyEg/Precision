import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TopNavComponent, CommonModule, NavigationIconComponent,CommonModule],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Transactions', routerLink: '/insights/transactions' },
  ];
  selectedTab: string = 'Pending';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  transactions: any[] = [
    {
      name: 'Diallo Restaurant Hub LLC',
      date: '01/22/2023',
      chk: '-',
      type: 'Withdrawal',
      amount: '$(19,115.45)',
      source: 'PNC CHK - 3775',
      comment: 'Lorem ipsum dolor sit amet.',
    },
    {
      name: 'Green Valley Market',
      date: '02/14/2023',
      amount: '$(2,540.00)',
      chk: '-',
      type: 'Deposit',
      account: 'Wells Fargo - 8765',
      comment: 'Business payment received.',
    },
    {
      name: 'Urban Eats',
      date: '03/05/2023',
      amount: '$(1,200.75)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Bank of America - 1234',
      comment: 'Monthly operational expenses.',
      country: 'France',
    },
    {
      name: 'Sunshine Bakery',
      date: '03/20/2023',
      amount: '$(750.50)',

      chk: '-',
      type: 'Deposit',
      account: 'Chase Bank - 9876',
      comment: 'Client payment for catering.',
      country: 'Germany',
    },
    {
      name: 'Tech Solutions Inc.',
      date: '04/01/2023',
      amount: '$(5,500.00)',
      chk: '-',

      type: 'Withdrawal',
      account: 'HSBC - 3333',
      comment: 'Technology services and support.',
      country: 'United States',
    },
    {
      name: 'Fashion Forward',
      date: '04/15/2023',
      amount: '$(3,150.25)',
      chk: '-',

      type: 'Deposit',
      account: 'Citi Bank - 4444',
      comment: 'Client payment for merchandise.',
      country: 'Canada',
    },
    {
      name: 'Global Supplies Ltd.',
      date: '05/02/2023',
      amount: '$(8,300.50)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Standard Chartered - 5555',
      comment: 'Bulk purchase of materials.',
      country: 'France',
    },
    {
      name: 'Foodies Corner',
      date: '05/18/2023',
      amount: '$(1,050.75)',
      chk: '-',

      type: 'Deposit',
      account: 'Bank of America - 6666',
      comment: 'Monthly subscription fees.',
      country: 'Germany',
    },
    {
      name: 'Wellness Clinic',
      date: '06/07/2023',
      amount: '$(2,780.60)',
      chk: '-',

      type: 'Withdrawal',
      account: 'US Bank - 7777',
      comment: 'Medical supplies restocking.',
      country: 'United States',
    },
    {
      name: 'Eco Living',
      date: '06/25/2023',
      amount: '$(3,925.00)',
      chk: '-',

      type: 'Deposit',
      account: 'Chase Bank - 8888',
      comment: 'Sale of eco-friendly products.',
      country: 'Canada',
    },
    {
      name: 'Education First',
      date: '07/10/2023',
      amount: '$(4,500.00)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Wells Fargo - 9999',
      comment: 'Education supplies purchase.',
      country: 'France',
    },
    {
      name: 'Sports Hub',
      date: '07/21/2023',
      amount: '$(1,275.40)',
      chk: '-',

      type: 'Deposit',
      account: 'HSBC - 1111',
      comment: 'Client payment for equipment.',
      country: 'Germany',
    },
    {
      name: 'Health Plus',
      date: '08/05/2023',
      amount: '$(2,850.75)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Citi Bank - 2222',
      comment: 'Monthly medical supplies.',
      country: 'United States',
    },
    {
      name: 'Cafe Delights',
      date: '08/19/2023',
      amount: '$(920.50)',

      chk: '-',
      type: 'Deposit',
      account: 'Bank of America - 3333',
      comment: 'Catering services payment.',
      country: 'Canada',
    },
    {
      name: 'Build It',
      date: '09/01/2023',
      amount: '$(6,150.30)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Standard Chartered - 4444',
      comment: 'Construction material purchase.',
      country: 'France',
    },
    {
      name: 'Gourmet Meals',
      date: '09/14/2023',
      amount: '$(1,340.25)',
      chk: '-',

      type: 'Deposit',
      account: 'US Bank - 5555',
      comment: 'Monthly subscription fees.',
      country: 'Germany',
    },
    {
      name: 'Tech Innovators',
      date: '10/03/2023',
      amount: '$(7,850.00)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Chase Bank - 6666',
      comment: 'New software purchase.',
      country: 'United States',
    },
    {
      name: 'The Green Thumb',
      date: '10/21/2023',
      amount: '$(1,150.75)',
      chk: '-',

      type: 'Deposit',
      account: 'Wells Fargo - 7777',
      comment: 'Client payment for services.',
      country: 'Canada',
    },
    {
      name: 'Mindful Medics',
      date: '11/04/2023',
      amount: '$(3,450.80)',
      chk: '-',

      type: 'Withdrawal',
      account: 'Bank of America - 8888',
      comment: 'Medical equipment purchase.',
      country: 'France',
    },
    {
      name: 'Blue Skies Travels',
      date: '11/20/2023',
      amount: '$(2,750.60)',
      chk: '-',

      type: 'Deposit',
      account: 'HSBC - 9999',
      comment: 'Client payment for packages.',
      country: 'Germany',
    },
  ];
}
