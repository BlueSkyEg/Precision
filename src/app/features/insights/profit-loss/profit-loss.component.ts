import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-profit-loss',
  standalone: true,
  imports: [TopNavComponent],
  templateUrl: './profit-loss.component.html',
})
export class ProfitLossComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Profit & loos', routerLink: '/insights/profit-loos' },
  ];
}
