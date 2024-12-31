import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-balance-sheet-table',
  standalone: true,
  imports: [CommonModule,NavigationIconComponent],
  templateUrl: './balance-sheet-table.component.html'
})
export class BalanceSheetTableComponent {
  @Input() periods:string[]|number[] =[];
  @Input() columns:string[] =[];
  @Input() reportData: any[]|null = [];
  @Input() isPercentage:boolean = false;
  // Track the currently visible dropdown
  activeDropdownId: string | null = null;

  toggleDropDown(reportId: string): void {
    if (this.activeDropdownId === reportId) {
      // Close the currently open dropdown
      this.activeDropdownId = null;
    } else {
      // Open the new dropdown and close others
      this.activeDropdownId = reportId;
    }
  }

  isDropdownVisible(reportId: string): boolean {
    return this.activeDropdownId === reportId;
  }
}
