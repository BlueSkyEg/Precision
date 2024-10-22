import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [TopNavComponent],
  templateUrl: './client.component.html',
})
export class ClientComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Dashboard', routerLink: '/insights/dashboard' },
    { label: 'Client', routerLink: '/insights/dashboard/client-dashboard' },
  ];
}
