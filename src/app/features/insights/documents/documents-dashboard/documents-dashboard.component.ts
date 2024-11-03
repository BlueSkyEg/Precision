import { Component } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { TotalTransactionsCardComponent } from 'app/shared/components/total-transactions-card/total-transactions-card.component';

@Component({
  selector: 'app-documents-dashboard',
  standalone: true,
  imports: [
    TopNavComponent,
    NavigationIconComponent,
    TotalTransactionsCardComponent,
  ],
  templateUrl: './documents-dashboard.component.html',
})
export class DocumentsDashboardComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Documents', routerLink: '/insights/documents' },
    {
      label: 'Documents Dashboard',
      routerLink: '/insights/documents/document-dashboard',
    },
  ];
  totalIncome: number = 20;
  grossProfit: number = 30;
  totalExpenses: number = 40;
  pending: number = 400;
  awaiting: number = 400;
  basicData: any;
  basicOptions: any;
}
