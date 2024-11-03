import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-total-transactions-card',
  standalone: true,
  imports: [NavigationIconComponent, NgClass, CurrencyPipe],
  templateUrl: './total-transactions-card.component.html',
})
export class TotalTransactionsCardComponent {
  @Input() totalNumber: number = 0;
  @Input() iconName: string = '';
  @Input() iconColor:string = 'text-white';
  @Input() cardName: string = '';
  @Input() isBordered: boolean = false;
  @Input() isBg: boolean = false;
  @Input() textColor: string = 'text-gray-400';
  @Input() textSize: string = 'text-2xl';
  @Input() percentage?: number;
}
