import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { NavigationIconComponent } from "../../core/icons/navigation-icons/navigation-icon.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TopNavComponent, NavigationIconComponent],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Settings', routerLink: '/insights/settings' },
  ];
}
