import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { NgClass } from '@angular/common';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

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
  @Output() optionSelected: EventEmitter<number> = new EventEmitter<number>();
  @Input() isSelectedOption: boolean = true;
  @Input() selectedOption: any = this.options?.[0] || '';
  dropdownVisible: boolean = false;
  searchQuery: string = '';

  selectOption(option: number, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.optionSelected.emit(option);
    this.selectedOption = option.toString();
    this.dropdownVisible = false;
    console.log('Option selected:', option, 'Dropdown closed');
  }
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
  onSearch(query: string) {
    this.searchQuery = query;
  }
  get filteredOptions(): any[] {
    if (!this.searchQuery && this.options) {
      return this.options;
    }
    return this.options ? this.options.filter((option) =>
      option.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    ) : [];
  }
}
