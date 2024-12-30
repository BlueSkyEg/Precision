import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { NgClass } from '@angular/common';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [SearchInputComponent, NgClass, NavigationIconComponent],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() options: any[] | undefined = [5, 10, 15];
  @Input() isSearchBoxVisible: boolean = false;
  @Input() isWLg: boolean = false;
  @Input() isSelectedOption: boolean = true;
  @Input() selectedOption: any = this.options?.[0] || '';

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  dropdownStateService: DropdownStateService =inject(DropdownStateService);

  dropdownVisible: boolean = false;
  searchQuery: string = '';

  get filteredOptions(): any[] {
    if (!this.searchQuery && this.options) {
      return this.options;
    }
    return this.options ? this.options.filter((option) =>
      option.companyName ? option.companyName.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) : option.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [];
  }
  selectOption(option: any, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    if (option.companyName){
      this.dropdownStateService.setSelectedBusiness(option);
    }
    this.optionSelected.emit(option);
    this.selectedOption = option.companyName ? option.companyName.toString() : option.toString();
    this.dropdownVisible = false;
  }
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
  onSearch(query: string) {
    this.searchQuery = query;
  }

}
