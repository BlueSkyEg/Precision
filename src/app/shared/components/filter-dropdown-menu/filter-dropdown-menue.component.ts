import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { IBusinesses } from 'app/shared/interfaces/insights/ibusinesses';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-filter-dropdown-menu',
  standalone: true,
  imports: [FormsModule, DropdownModule, DropdownComponent],
  templateUrl: './filter-dropdown-menu.component.html',
})
export class FilterDropdownMenuComponent implements OnInit {
  business: any[] | undefined;
  selectedbussiness: IBusinesses | null = null;
  filterValue: string | undefined = '';
  _DashboardService = inject(DashboardService);

ngOnInit(): void {
    this.getBusinesses()
}
  getBusinesses() {
    this._DashboardService.getbusinesses().subscribe({
      next: (response) => {
        this.business = response.data.items;
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
