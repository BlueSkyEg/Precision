import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-accountant',
  standalone: true,
  imports: [TopNavComponent],
  templateUrl: './accountant.component.html',
})
export class AccountantComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Accountant', routerLink: '/insights/dashboard/accountant-dashboard' },
  ];
}
