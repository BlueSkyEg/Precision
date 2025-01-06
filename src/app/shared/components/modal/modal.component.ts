import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsightsCompanyService } from 'app/core/services/insights-company/insights-company.service';
import { TransactionsService } from 'app/core/services/transactions/transactions.service';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { trigger, transition, style, animate } from '@angular/animations';

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
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() modalVisible: boolean = false;
  @Input() isFilter: boolean = false;
  @Input() data: any = null;
  @Input() options: any[] = [];
  @Input() pendingTransactions: any[] = [];

//outputs
  @Output() transactionsUpdated = new EventEmitter<any[]>();
  @Output() ModalClosed = new EventEmitter();

  private _selectedId: string = this.data?.accountId;

  //injected services
  private _InsightsCompanyService: InsightsCompanyService = inject(
    InsightsCompanyService
  );
  private _transactionService: TransactionsService =
    inject(TransactionsService);
  private _DropdownStateService: DropdownStateService =
    inject(DropdownStateService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this._selectedId = this.data?.accountId || '';
    }
  }

  closeModal(event?: Event) {
    this._selectedId = this.data?.accountId;
    this.ModalClosed.emit(event);
  }

  // Getter for selectedId
  get accountId(): string {
    return this._selectedId;
  }

  //get Account Id
  getAccountId(event: { id: string }): void {
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
      suspenseId: this.data?.id,
      accountId: this.accountId,
      clientMemo: 'try comment',
      changerId: '67e09bbd-2396-49fa-b5c1-2152c23b40ad',
      isAccountantAction: true,
    };
    this._transactionService
      .updateSuspenseAccount(this.businessId, requestBodyData)
      .subscribe({
        next: (response) => {
          if (response.statusCode == 200 && response.succeeded) {
            const removedTransaction = this.pendingTransactions.find(
              (transaction) => transaction.id === response.data
            );
            console.log(response.data);
            console.log(removedTransaction);
        const updatedTransactions = this.pendingTransactions.filter(
          (transaction: any) => transaction.id !== response.data
        );
            console.log(updatedTransactions);
          this.transactionsUpdated.emit(updatedTransactions);

            this.closeModal();
          }
        },
      });
  }
}
