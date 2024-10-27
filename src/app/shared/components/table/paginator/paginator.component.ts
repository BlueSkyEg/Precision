import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems = 0;
  @Input() itemsPerPageOptions = [10, 25, 50];
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  currentPage = 1;
  itemsPerPage = this.itemsPerPageOptions[0];
  totalPages = 0;
  pages: number[] = [];

  ngOnInit() {
    this.calculateTotalPages();
    this.updatePages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePages();
    this.itemsPerPageChange.emit(this.itemsPerPage);
  }

  getPageRange() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end}`;
  }
}
