import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { ButtonComponent } from 'app/shared/components/button/button.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TopNavComponent, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Profile', routerLink: '/insights/profile' },
  ];
}
