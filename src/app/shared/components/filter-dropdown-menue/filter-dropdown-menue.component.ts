import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { IBusinesses } from 'app/shared/interfaces/insights/IBusinesses';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-filter-dropdown-menue',
  standalone: true,
  imports: [FormsModule, DropdownModule, NavigationIconComponent],
  templateUrl: './filter-dropdown-menue.component.html',
})
export class FilterDropdownMenueComponent implements OnInit {
  bussiness: IBusinesses[] | undefined;
  selectedbussiness: IBusinesses | null = null;
  filterValue: string | undefined = '';
  _DashboardService = inject(DashboardService);

ngOnInit(): void {
    this.getBusinesses()
}
  getBusinesses() {
    this._DashboardService.getbusinesses().subscribe({
      next: (response) => {
        this.bussiness = response.data.items;
      },
    });
  }
  resetFunction(options?: DropdownFilterOptions) {
    if (options && options.reset) {
      options?.reset();
    }
    this.filterValue = '';
  }

  customFilterFunction(event: KeyboardEvent, options?: DropdownFilterOptions) {
    if (options && options.filter) {
      (options.filter as (event: KeyboardEvent) => void)(event);
    }
  }
}
