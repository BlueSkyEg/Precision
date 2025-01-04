import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Output() ModalClosed = new EventEmitter();
  @Input() data: any = null;
  @Input() options: any[] = [];
  @Input() pendingTransactions:any[]=[];
  private _selectedId: string | null = null;
//injected services
  private _InsightsCompanyService: InsightsCompanyService = inject(InsightsCompanyService);
  private _transactionService: TransactionsService = inject(TransactionsService);
  private _DropdownStateService: DropdownStateService = inject(DropdownStateService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  ngOnInit(): void {
    // Subscribe to the selected business state

  }
  closeModal(event?: Event) {
    this.ModalClosed.emit(event);
  }

  //get Account Name
  getAccountName(accountId: string): string {
    return this._InsightsCompanyService.getAccountNameById(accountId) || 'Unknown Account';
  }

  //get Account Id
  getAccountId(event: { id: string }): void {
    console.log(event.id);
    this._selectedId = event.id; // Save the selected id
  }

  // Getter for selectedId
  get accountId(): string | null {
    return this._selectedId;
  }
  //get business Id
  get businessId(): string | null {
    if (this._DropdownStateService.isBusinessSelected()) {
      return this._DropdownStateService.getSelectedBusiness()?.companyId ?? null;
    }
    return null;
  }

  updateTransaction() {
    const requestBodyData: any = {
      "suspenseId": this.data?.id,
      "accountId": this.accountId ? this.accountId : this.data?.accountId,
      "clientMemo": "try comment",
      "changerId": "67e09bbd-2396-49fa-b5c1-2152c23b40ad",
      "isAccountantAction": true
    }
    this._transactionService.updateSuspenseAccount(this.businessId, requestBodyData).subscribe({
      next: (response) => {
        if (response.statusCode == 200 && response.succeeded) {
          console.log('Update suspense account successfully');
          this.pendingTransactions = this.pendingTransactions.filter(
            (transaction: any) => transaction.id !== response.data.id
          );
          this.cdr.detectChanges();
          this.closeModal();
        }
      },
    }
    )
  }
}
