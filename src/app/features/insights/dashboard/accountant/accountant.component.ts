import { Component } from '@angular/core';
import { TableComponent } from 'app/shared/components/table/table.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';

@Component({
  selector: 'app-accountant',
  standalone: true,
  imports: [TopNavComponent, TotalTransactionsCardComponent, TableComponent],
  templateUrl: './accountant.component.html',
})
export class AccountantComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    {
      label: 'Accountant',
      routerLink: '/insights/dashboard/accountant-dashboard',
    },
  ];
}
