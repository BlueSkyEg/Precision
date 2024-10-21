import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-filter-dropdown-menue',
  standalone: true,
  imports: [FormsModule, DropdownModule,NavigationIconComponent],
  templateUrl: './filter-dropdown-menue.component.html',
})
export class FilterDropdownMenueComponent implements OnInit {
  countries: City[] | undefined;
  selectedCountry: City | null = null;
  filterValue: string | undefined = '';

  ngOnInit() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
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
