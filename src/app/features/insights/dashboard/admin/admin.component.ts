import { Component } from '@angular/core';
import { TableComponent } from 'app/shared/components/table/table.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TopNavComponent,TotalTransactionsCardComponent,TableComponent],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Admin', routerLink: '/insights/dashboard/admin-dashboard' },
  ];
}
