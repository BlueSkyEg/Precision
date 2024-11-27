import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule],
  templateUrl: './date-range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent {
  get minDate(): Date {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear - 1, 0, 1);
  }

  get maxDate(): Date {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, 11, 31);
  }
}
