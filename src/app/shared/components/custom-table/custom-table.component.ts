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
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { TransactionsService } from 'app/core/services/transactions/transactions.service';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent {
  @Input() AllData: any[] = [];
  @Input() isTransaction: boolean = false;
  @Input() isBusiness: boolean = false;
  @Input() placeholderText: string = '';
  @Input() options: any[] = [];
  @Input() isUpdated: boolean = false;
  @Input() isHistory: boolean = false;
  @Input() historyLogs: boolean = false;
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
  @Output() openFilterModal = new EventEmitter<{ isChooseAccount: boolean, selectedAccountsCount: any }>();
  @Output() getUserId = new EventEmitter<{ userId: string; type: string }>();
  @Output() getCompanyId = new EventEmitter<string>();
  isChooseAccount: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedAccountsCount: number = 0;
  searchQuery: string = '';
  sortedData: any[] = [];
  sortKey: string = '';
  sortOrder: 'asc' | 'desc' | '' = '';
  _accountId: string = '';
  _transactionId: string = '';
  updatedTransactions: Record<string, boolean> = {};
  transactionHistory: any[] = [];
  singleTransactionHistory: any[] = [];
  selectedTransactions: any[] = [];
  areAllSelected:boolean = false;
  storedId = localStorage.getItem('id');
  private _InsightsCompanyService: InsightsCompanyService = inject(
    InsightsCompanyService
  );
  private _DropdownStateService: DropdownStateService =
    inject(DropdownStateService);
  private _transactionService: TransactionsService =
    inject(TransactionsService);
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

  openFilter(isChooseAccount: boolean, selectedAccountsCount: any) {
    // Filter AllData to get only the selected transactions (chosen accounts)
    const filteredTransactions = this.AllData.filter(transaction =>
      this.selectedTransactions.includes(transaction)
    );

    // Prepare the data to be passed to the modal
    const filterData = {
      isChooseAccount,
      selectedAccountsCount,
      selectedTransactions: filteredTransactions  // Pass the filtered transactions
    };

    this.openFilterModal.emit(filterData);  // Emit the filtered data to the modal
  }

  toggleSelection(transaction: any) {
    this.areAllSelected = this.PaginatedData.every((item) => item.selected);
    transaction.selected = !transaction.selected;
    this.updateSelectedCount();
    if (this.selectedTransactions.includes(transaction)) {
      // Deselect the transaction
      this.selectedTransactions = this.selectedTransactions.filter(t => t !== transaction);
    } else {
      // Select the transaction
      this.selectedTransactions.push(transaction);
    }
    // Update the selected count
    this.selectedAccountsCount = this.selectedTransactions.length;
  }

  onTransactionsUpdated(updatedData: any[]) {
    this.AllData = updatedData;
    this.updateSortedData();
    this.filteredItems;
    this.PaginatedData;

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
        transaction.txnName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else if (this.isBusiness) {
      return this.AllData.filter((business) =>
        business.companyName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
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


  toggleSelectAll(isChecked: boolean): void {
    this.areAllSelected = isChecked;
    this.PaginatedData.forEach((tx) => {
      tx.selected = isChecked ?? false;
    });
    this.updateSelectedCount();
  }

  updateSelectedCount(): void {
    this.selectedAccountsCount = this.PaginatedData.filter(
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
    return (
      this._InsightsCompanyService.getAccountNameById(accountId) ||
      'Unknown Account'
    );
  }

  //get business Id
  get businessId(): string | null {
    if (this._DropdownStateService.isBusinessSelected()) {
      return (
        this._DropdownStateService.getSelectedBusiness()?.companyId ?? null
      );
    }
    return null;
  }



  //update and clear transactions

  getId(id: string): void {
    this._transactionId = id;
  }

  //get Account Id
  get accountId(): string {
    return this._accountId;
  }
  //get transactionId
  get transactionId(): string {
    return this._transactionId;
  }

  onDropdownChange(event: { id: string }, id: string): void {
    this.updatedTransactions[id] = true;
    this._accountId = event.id;
  }

  updateTransaction() {
    const requestBodyData: any = {
      suspenseId: this.transactionId,
      accountId: this.accountId,
      clientMemo: 'try comment',
      changerId: this.storedId,
      isAccountantAction: true,
    };
    console.log(requestBodyData);

    this._transactionService.updateSuspenseAccount(this.businessId, requestBodyData).subscribe({
      next: (response) => {
        if (response.statusCode === 200 && response.succeeded) {
          console.log(response);
          console.log(this.AllData);

          // Find the transaction in AllData and update the accountId
          const transactionIndex = this.AllData.findIndex(
            (transaction: any) => transaction.id === this.transactionId
          );

          if (transactionIndex !== -1) {
            // Update the accountId in AllData
            this.AllData[transactionIndex].accountId = this.accountId;

            // Reset the isUpdated status for this transaction
            this.updatedTransactions[this.transactionId] = false;

            console.log('Updated AllData:', this.AllData);
          } else {
            console.warn('Transaction not found in AllData');
          }
        }
      },
      error: (err) => {
        console.error('Error updating transaction:', err);
      },
    });
  }
  clearTransaction() {
    const requestBodyData: any = {
      "suspenseId": this.transactionId,
      "accountantId": this.storedId
    }
    console.log(requestBodyData, this.businessId);
    this._transactionService
      .clearSuspenseAccount(this.businessId, requestBodyData)
      .subscribe({
        next: (response) => {
          if (response.statusCode == 200 && response.succeeded) {
            const deletedTransactionId = response.data;
            this.AllData = this.AllData.filter(transaction => transaction.id !== deletedTransactionId);
            this.updateSortedData();
            this.PaginatedData;
          }
        },
      });
  }
  //history
  getHistoryByTransactionId(transactionId: string) {
    this._transactionService.getHistoryByTransactionId(this.businessId, transactionId).subscribe({
      next: (response) => {
        if (response.succeeded) {
          console.log('Transaction History:', response.data);
          this.transactionHistory = response.data;
        }
      },
      error: (err) => {
        console.error('Error getting transaction history:', err);
      },
    });
  }
  getSingleHistory(transactionId: string ) {
    this._transactionService.getHistory(this.businessId, transactionId).subscribe({
      next: (response) => {
        if (response.succeeded) {
          console.log('Single Transaction History:', response.data);
          this.singleTransactionHistory = response.data;
        }
      },
      error: (err) => {
        console.error('Error getting transaction history:', err);
      },
    });
  }
}
