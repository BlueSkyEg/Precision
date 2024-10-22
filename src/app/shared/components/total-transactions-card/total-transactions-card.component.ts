import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-total-transactions-card',
  standalone: true,
  imports: [NavigationIconComponent],
  templateUrl: './total-transactions-card.component.html',
})
export class TotalTransactionsCardComponent {
  @Input() pendingtransactionNumber: number = 0;
  @Input() awaitingtransactionNumber: number = 0;
  @Input() reviewedtransactionNumber: number = 0;
}
