import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, inject, Input, Output, SimpleChanges } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsightsCompanyService } from 'app/core/services/insights-company/insights-company.service';
import { TransactionsService } from 'app/core/services/transactions/transactions.service';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { TabsComponent } from "../tabs/tabs.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    NavigationIconComponent,
    DateRangeComponent,
    DropdownComponent,
    FormsModule,
    NavigationIconComponent,
    ReactiveFormsModule,
    TabsComponent
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() modalVisible: boolean = false;
  @Input() isFilter: boolean = false;
  @Input() data: any = null;
  @Input() options: any[] = [];
  @Input() pendingTransactions: any[] = [];
  @Input() isHistory: boolean = false;
  @Input() isChooseAccount: boolean = false;
  @Input() selectedAccountsCount: any = 0;

  //outputs
  @Output() transactionsUpdated = new EventEmitter<any[]>();
  @Output() ModalClosed = new EventEmitter();
  @Input() historyLogs:boolean = false;
  @Input() transactionHistory:any[] = [];
  @Input() singleTransactionHistory: any[] = [];

  private _selectedId: string = this.data?.accountId;
  //tabs
  EditTabs: string[] = ['Submission', 'History'];
  selectedTab: string = 'Submission';
  storedId = localStorage.getItem('id');

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  //injected services
  private _InsightsCompanyService: InsightsCompanyService = inject(
    InsightsCompanyService
  );
  private _transactionService: TransactionsService =
    inject(TransactionsService);
  private _DropdownStateService: DropdownStateService =
    inject(DropdownStateService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      if (Array.isArray(this.data)) {
        // If data is an array, you can assign accountId from the first item (or another suitable logic)
        this._selectedId = this.data.length > 0 ? this.data[0].accountId : '';
      } else {
        // If data is a single object
        this._selectedId = this.data?.accountId || '';
      }
      console.log(this._selectedId);
    }

    if (changes['historyLogs']) {
      this.selectedTab = this.historyLogs ? 'History' : 'Submission';
    }
  }


  closeModal(event?: Event) {
    this.modalVisible = false;
    if (this.data?.accountId)
    {this._selectedId = this.data?.accountId;}
    else{

    }
    this.ModalClosed.emit(event);
  }

  // Getter for selectedId
  get accountId(): string {
    return this._selectedId;
  }

  //get Account Id
  getAccountId(event: { id: string }): void {
    console.log(event)
    this._selectedId = event.id;
  }

  get selectedAccount(): string {
    return (
      this._InsightsCompanyService.getAccountNameById(this.accountId) ||
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

  updateTransaction() {
    const requestBodyData: any = {
      accountId: this.accountId,
      clientMemo: 'try comment',
      changerId: this.storedId,
      isAccountantAction: true,
    };
    console.log(requestBodyData ,this.data)
    if (Array.isArray(this.data)) {
      // Loop through all transactions in the array
      this.data.forEach((transaction: any) => {
        const transactionData = {
          ...requestBodyData,
          suspenseId: transaction.id, // Transaction-specific ID
        };

        this._transactionService
          .updateSuspenseAccount(this.businessId, transactionData)
          .subscribe({
            next: (response) => {
              if (response.statusCode == 200 && response.succeeded) {
                if (this.isHistory) {
                  transaction.accountId = this.accountId;
                } else {
                  const updatedTransactions = this.pendingTransactions.filter(
                    (t: any) => t.id !== response.data
                  );
                  this.transactionsUpdated.emit(updatedTransactions);
                }
              }
            },
          });
      });
    } else {
      // Handle case when data is not an array (if needed)
      const transactionData = {
        ...requestBodyData,
        suspenseId: this.data?.id, // Single transaction
      };

      this._transactionService
        .updateSuspenseAccount(this.businessId, transactionData)
        .subscribe({
          next: (response) => {
            if (response.statusCode == 200 && response.succeeded) {
              if (this.isHistory) {
                this.data.accountId = this.accountId;
              } else {
                const updatedTransactions = this.pendingTransactions.filter(
                  (transaction: any) => transaction.id !== response.data
                );
                this.transactionsUpdated.emit(updatedTransactions);
              }
              this.closeModal();
            }
          },
        });
    }
  }


  clearTransaction() {
    const requestBodyData: any = {
      "suspenseId": this.data?.id,
      "accountantId": this.storedId
    }
    console.log(requestBodyData, this.businessId);
    this._transactionService
      .clearSuspenseAccount(this.businessId, requestBodyData)
      .subscribe({
        next: (response) => {
          if (response.statusCode == 200 && response.succeeded) {
            const updatedTransactions = this.pendingTransactions.filter(
              (transaction: any) => transaction.id !== response.data
            );
            this.transactionsUpdated.emit(updatedTransactions);
            this.closeModal();
          }
        },
      });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const modal = document.getElementById('modal');
    if (modal && !modal.contains(event.target as Node) && this.modalVisible) {
      this.closeModal();
      console.log(this.selectedTab);
      console.log(this.historyLogs)

    }
  }

}
