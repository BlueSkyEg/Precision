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
  // Inputs
  @Input() options: any[] | undefined = [5, 10, 15];
  @Input() isSearchBoxVisible: boolean = false;
  @Input() isWLg: boolean = false;
  @Input() isSelectedOption: boolean = true;
  @Input() selectedOption: any = this.options?.[0] || '';
  @Input() isAccount: boolean = false;

  // Outputs
  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  // Services
  dropdownStateService: DropdownStateService = inject(DropdownStateService);

  // Local state
  dropdownVisible: boolean = false;
  searchQuery: string = '';

  get filteredOptions(): any[] {
    return (
      this.options?.filter((option) => {
        const searchKey = this.isAccount
          ? option.fullName
          : option.companyName || option.toString();
        return searchKey
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      }) || []
    );
  }

  // Toggles dropdown visibility
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Updates search query
  onSearch(query: string): void {
    this.searchQuery = query;
  }
  selectOption(option: any, event?: MouseEvent): void {
    if (event) event.stopPropagation();

    const selectedKey = this.isAccount
      ? option.fullName
      : option.companyName || option.toString();
    this.selectedOption = selectedKey;
    this.dropdownVisible = false;

    this.optionSelected.emit(option);
  }
}
