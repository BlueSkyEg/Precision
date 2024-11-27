import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { NavigationIconComponent } from '../../../core/icons/navigation-icons/navigation-icon.component';
import { PaginatorComponent } from '../transactions/paginator/paginator.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { ModalComponent } from '../modal/modal.component';
import { OverlayComponent } from '../transactions/overlay/overlay.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custome-table',
  standalone: true,
  imports: [
    DropdownComponent,
    NavigationIconComponent,
    PaginatorComponent,
    SearchInputComponent,
    ModalComponent,
    OverlayComponent,
    CommonModule,
  ],
  templateUrl: './custome-table.component.html',
})
export class CustomeTableComponent {
  @Input() AllData: any[] = [];
  @Output() openFilterModal = new EventEmitter<void>();

  data: any = null;
  @Input() tableHeader = [
    { Name: 'Name', isSorted: false, width: '15%' },
    {
      Name: 'date',
      isSorted: true,
      sortOrder: '' as '' | 'asc' | 'desc',
      width: '10%',
    },
    { Name: 'CHK', isSorted: false, width: '5%' },
    { Name: 'Type', isSorted: false, width: '10%' },
    {
      Name: 'amount',
      isSorted: true,
      sortOrder: '' as '' | 'asc' | 'desc',
      width: '10%',
    },
    { Name: 'Source', isSorted: false, width: '8%' },
    { Name: 'Comment', isSorted: false, width: '10%' },
    { Name: 'Classification/Account', isSorted: false, width: '20%' },
    { Name: 'Actions', isSorted: false },
  ];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedAccountsCount: number = 0;
  searchQuery: string = '';
  sortedData: any[] = [];
  sortKey: string = '';
  sortOrder: 'asc' | 'desc' | '' = '';
  options: any[] = ['suspense', 'Option1', 'Option2', 'Option3'];
  //editModal
  editModalVisible: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['AllData']) {
      this.updateSortedData();
    }
  }

  changePage(page: any) {
    this.currentPage = page;
  }

  openFilter() {
    this.openFilterModal.emit();
  }

  toggleSort(columnName: string): void {
    this.tableHeader = this.tableHeader.map((header) => {
      if (header.Name === columnName) {
        header.sortOrder = header.sortOrder === 'asc' ? 'desc' : 'asc';
        this.sortKey = columnName;
        this.sortOrder = header.sortOrder;
      } else {
        header.sortOrder = '';
      }
      return header;
    });

    this.applySorting(columnName);
  }

  private updateSortedData(): void {
    let filteredData = this.AllData;

    if (this.searchQuery) {
      filteredData = filteredData.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.sortKey && this.sortOrder) {
      filteredData = [...filteredData].sort((a, b) => {
        const valueA = a[this.sortKey];
        const valueB = b[this.sortKey];

        if (valueA == null || valueB == null) return 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (valueA instanceof Date && valueB instanceof Date) {
          return this.sortOrder === 'asc'
            ? valueA.getTime() - valueB.getTime()
            : valueB.getTime() - valueA.getTime();
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });
    }

    this.sortedData = filteredData;
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
  private applySorting(columnName: string): void {
    const column = this.tableHeader.find(
      (header) => header.Name === columnName
    );
    if (column && column.sortOrder) {
      this.sortedData = [...this.AllData].sort((a, b) => {
        let valueA = a[columnName];
        let valueB = b[columnName];

        // Handle sorting for 'date'
        if (columnName === 'date') {
          valueA = new Date(valueA); // Convert to Date object
          valueB = new Date(valueB); // Convert to Date object
        }

        // Handle sorting for 'amount'
        if (columnName === 'amount') {
          valueA = +valueA; // Ensure valueA is treated as a number
          valueB = +valueB; // Ensure valueB is treated as a number
        }

        // Sort based on string comparison (for other columns)
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return column.sortOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        // For numeric comparisons (dates, amounts, etc.)
        return column.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }
  }

  get filteredTransactions() {
    return this.AllData.filter((transaction) =>
      transaction.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearch(query: string): void {
    this.searchQuery = query.trim();
    this.updateSortedData();
  }

  get PaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let data = this.sortedData;
    if (this.searchQuery) {
      data = this.filteredTransactions;
    }

    if (this.sortKey && this.sortOrder) {
      data = [...data].sort((a, b) => {
        const valueA = a[this.sortKey];
        const valueB = b[this.sortKey];

        if (valueA == null || valueB == null) return 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (valueA instanceof Date && valueB instanceof Date) {
          return this.sortOrder === 'asc'
            ? valueA.getTime() - valueB.getTime()
            : valueB.getTime() - valueA.getTime();
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });
    }

    return data.slice(startIndex, endIndex);
  }

  selectOption(option: number) {
    this.itemsPerPage = option;
    this.currentPage = 1;
  }

  toggleSelection(transaction: any) {
    transaction.selected = !transaction.selected;
    this.updateSelectedCount();
  }

  toggleSelectAll(isChecked?: boolean): void {
    this.AllData.forEach((tx) => (tx.selected = isChecked));
    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    this.selectedAccountsCount = this.AllData.filter(
      (tx) => tx.selected
    ).length;
  }
  //editModal
  openEditModal(item: any) {
    this.data = item;
    this.editModalVisible = true;
  }
  closeEditModal(event?: Event) {
    this.editModalVisible = false;
    event?.preventDefault();
  }
}
