import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [NavigationIconComponent, FormsModule ,NgClass],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Input() searchQuery: string = '';
  @Input() isBordered: boolean = true;
  @Input() placeholder: string = 'Search'
  @Output() searchQueryChange = new EventEmitter<string>();
  onSearchChange(query: string) {
    this.searchQuery = query;
    this.searchQueryChange.emit(query);
  }
}
