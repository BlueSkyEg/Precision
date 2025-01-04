import {
  Component,
  EventEmitter,
  inject,
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

import { InsightsCompanyService } from 'app/core/services/insights-company/insights-company.service';

@Component({
  selector: 'app-custom-table',
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
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent {
  @Input() AllData: any[] = [];
  @Input() isTransaction: boolean = false;
  @Input() isBusiness: boolean = false;
  @Input() placeholderText: string = '';
  @Input() options: any[] = [];
  data: any = null;
  @Input() tableHeader: any[] = [
    { Name: 'Name', colName: 'txnName', isSorted: false, width: '15%' },
    {
      Name: 'date',
      colName: 'txnDate',
      isSorted: true,
      sortOrder: '' as '' | 'asc' | 'desc',
      width: '10%',
    },
    { Name: 'CHK', isSorted: false, width: '5%' },
    { Name: 'Type', isSorted: false, width: '10%' },
    {
      Name: 'amount',
      colName: 'txnAmount',
      isSorted: true,
      sortOrder: '' as '' | 'asc' | 'desc',
      width: '10%',
    },
    { Name: 'Source', isSorted: false, width: '8%' },
    { Name: 'Comment', isSorted: false, width: '10%' },
    { Name: 'Classification/Account', isSorted: false, width: '20%' },
    { Name: 'Actions', isSorted: false },
  ];
  @Output() openFilterModal = new EventEmitter<void>();
  @Output() getUserId = new EventEmitter<{ userId: string; type: string }>();
  @Output() getCompanyId = new EventEmitter<string>();

  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedAccountsCount: number = 0;
  searchQuery: string = '';
  sortedData: any[] = [];
  sortKey: string = '';
  sortOrder: 'asc' | 'desc' | '' = '';

  private _InsightsCompanyService: InsightsCompanyService = inject(InsightsCompanyService);


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
      if (header.colName === columnName) {
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

  get filteredItems() {
    if (this.isTransaction) {
      return this.AllData.filter((transaction) =>
        transaction.txnName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    else if (this.isBusiness) {
      return this.AllData.filter((business) =>
        business.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    else {
      return this.AllData.filter((user) =>
        user.profileName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query.trim();
    this.updateSortedData();
  }

  get PaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let data = this.sortedData;
    if (this.searchQuery) {
      data = this.filteredItems;
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


  // send Profile Id to Parent
  getProfileInfo(userId: string, type: string) {
    this.getUserId.emit({ userId, type });
  }
  getBusinessItem(companyId: string) {
    this.getCompanyId.emit(companyId);

  }


  //get Account Id
  getAccountName(accountId: string): string {
    return this._InsightsCompanyService.getAccountNameById(accountId) || 'Unknown Account';
  }
}
