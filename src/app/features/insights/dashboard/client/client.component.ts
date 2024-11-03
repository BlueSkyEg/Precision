import { Component } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [TopNavComponent,NavigationIconComponent,TotalTransactionsCardComponent],
  templateUrl: './client.component.html',
})
export class ClientComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Client', routerLink: '/insights/dashboard/client-dashboard' },
  ];
  totalIncome:number=20;
  grossProfit:number=30;
  totalExpenses:number=40;
}
