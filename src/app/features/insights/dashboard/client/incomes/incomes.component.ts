import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from "../../../../../core/icons/navigation-icons/navigation-icon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [NavigationIconComponent,CommonModule],
  templateUrl: './incomes.component.html'
})
export class IncomesComponent {
  @Input() label: string = '';
  @Input() labelIcon: string = '';
  @Input() amount: number = 0;
  @Input() themeColor: string = '';
  @Input() percentage: number = 0;
  @Input() percentageIcon: string = '';

}
