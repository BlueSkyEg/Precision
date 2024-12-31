import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from "../../../../core/icons/navigation-icons/navigation-icon.component";

@Component({
  selector: 'app-card-amounts',
  standalone: true,
  imports: [NavigationIconComponent],
  templateUrl: './card-amounts.component.html'
})
export class CardAmountsComponent {
  @Input() mainIconName: string = '';
  @Input() mainHeadTitle: string = '';
  @Input() firstAmount: number = 0;
  @Input() secondAmount: number = 0;
  @Input() firstTitle: string = '';
  @Input() secondTitle: string = '';
}
