import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { ButtonComponent } from 'app/shared/components/button/button.component';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [ButtonComponent,NavigationIconComponent,RouterOutlet],
  templateUrl: './profile-settings.component.html'
})
export class ProfileSettingsComponent {

}
