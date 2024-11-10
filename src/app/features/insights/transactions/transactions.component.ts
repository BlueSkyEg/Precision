import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TopNavComponent, CommonModule],
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
}
