import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [CommonModule,NavigationIconComponent],
  templateUrl: './report-table.component.html'
})
export class ReportTableComponent {
  @Input() periods:string[]|number[] =[];
  @Input() columns:string[] =[];
  @Input() reportData: any[]|null = [];
  @Input() isPercentage:boolean = false;
  dropdownVisibility: { [key: string]: boolean } = {};  //exportdropdown

  toggleDropDown(reportId: number): void {
    this.dropdownVisibility[reportId] = !this.dropdownVisibility[reportId];
  }

  isDropdownVisible(reportId: number): boolean {
    return this.dropdownVisibility[reportId] || false;
  }
}
