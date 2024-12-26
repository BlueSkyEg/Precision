import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { IBusinesses } from 'app/shared/interfaces/insights/ibusinesses';
import { DashboardService } from 'app/core/services/dashboard/dashboard.service';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';

@Component({
  selector: 'app-filter-dropdown-menu',
  standalone: true,
  imports: [FormsModule, DropdownModule, DropdownComponent],
  templateUrl: './filter-dropdown-menu.component.html',
})
export class FilterDropdownMenuComponent implements OnInit {
  selectedBusiness: IBusinesses | null = null;
  isBusinessSelected: boolean = false;
  business: IBusinesses[] | undefined;
  _DashboardService = inject(DashboardService);
  dropdownStateService = inject(DropdownStateService);
  ngOnInit(): void {
    this.getBusinesses();
    this.dropdownStateService.selectedBusiness$.subscribe((business) => {
      this.selectedBusiness = business;
      this.isBusinessSelected = business !== null;
    });
  }
  getBusinesses() {
    this._DashboardService.getbusinesses().subscribe({
      next: (response) => {
        this.business = response.data;
      },
    });
  }
  handleBusinessSelection(business: IBusinesses): void {
    this.dropdownStateService.setSelectedBusiness(business);
  }


}
