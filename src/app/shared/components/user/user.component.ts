import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavigationIconComponent],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() userName!: string;
  @Input() pcName!: string;
  @Input() userIconName:string= 'user';
  @Input() pcIconName: string = 'monitor';
}
