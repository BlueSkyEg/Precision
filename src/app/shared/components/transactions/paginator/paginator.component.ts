import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NavigationIconComponent, NgClass, DropdownComponent],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Input() items: any[] = [];
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() optionSelected: EventEmitter<number> = new EventEmitter<number>();
   options: any[] = [5, 10, 15];

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
  get currentItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  changePage(page: any) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }
  selectOption(option: number) {
    this.optionSelected.emit(option);

  }
  get visiblePages(): any[] {
    const maxVisiblePages = 5;
    const pages: (number | string)[] = [];
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(
          1,
          '...',
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.totalPages
        );
      }
    }

    return pages;
  }
}
