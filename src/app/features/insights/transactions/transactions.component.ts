import { CommonModule } from '@angular/common';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import {  ChangeDetectorRef, Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OverlayComponent } from 'app/shared/components/transactions/overlay/overlay.component';
import { ModalComponent } from 'app/shared/components/modal/modal.component';
import { TabsComponent } from 'app/shared/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from 'app/shared/components/custom-table/custom-table.component';
import { ITransactions } from 'app/shared/interfaces/insights/transaction-model';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';
import { TransactionsService } from 'app/core/services/transactions/transactions.service';
import { InsightsCompanyService } from 'app/core/services/insights-company/insights-company.service';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    TopNavComponent,
    CommonModule,
    CommonModule,
    OverlayComponent,
    ModalComponent,
    TabsComponent,
    FormsModule,
    CustomTableComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
  //breadCrumbs
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Transactions', routerLink: '/insights/transactions' },
  ];
  //tabs

  transactionTabs: string[] = ['Pending', 'Updated', 'History'];
  selectedTab: string = 'Pending';

  //filter modal
  filterVisible: boolean = false;

  //businesses
  selectedBusiness: IBusinesses | null = null;
  isBusinessSelected: boolean = false;

  //choose account
  selectedAccountsCount: number = 0;
  options: any[] = [];
  pendingTransactions: ITransactions[] = [];
  updatedTransactions: ITransactions[] = [];

  //Injected services
  private _DropdownStateService: DropdownStateService =
    inject(DropdownStateService);
  private _TransactionService: TransactionsService =
    inject(TransactionsService);
  private _InsightsCompanyService: InsightsCompanyService = inject(
    InsightsCompanyService
  );
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Subscribe to the selected business state
    this._DropdownStateService.selectedBusiness$.subscribe((business) => {
      this.selectedBusiness = business;
      this.isBusinessSelected = business !== null;

      if (this.isBusinessSelected) {
        this.getPendingTransactions();
        this.getUpdatedTransactions();
        this.getAccounts();
      }
    });
  }
  //get business Id
  get businessId() {
    if (this.selectedBusiness) {
      return this.selectedBusiness.companyId;
    }
    return null;
  }
  //pending transactions
  getPendingTransactions(): void {
    this.cdr.detectChanges();

    if (this.businessId) {
      this.cdr.detectChanges();

      this._TransactionService
        .getPendingTransactions(this.businessId)
        .subscribe({
          next: (data) => {
            if (data.succeeded == true) {
              console.log(data);
              this.pendingTransactions = data.data;
              this.cdr.detectChanges();
            }
          },
          error: (err) => console.error('Error:', err),
        });
    }
  }

  //Updated transactions
  getUpdatedTransactions(): void {
    this.cdr.detectChanges();

    if (this.businessId) {
      this.cdr.detectChanges();

      this._TransactionService
        .getUpdatedTransactions(this.businessId)
        .subscribe({
          next: (data) => {
                          console.log(data);

            if (data.succeeded == true) {
              console.log(data);
              this.updatedTransactions = data.data;
              this.cdr.detectChanges();
            }
          },
          error: (err) => console.error('Error:', err),
        });
    }
  }
  //get accounts
  getAccounts(): void {
    if (this.businessId) {
      this._InsightsCompanyService.getAccounts(this.businessId).subscribe({
        next: (data) => {
          if (data.succeeded) {
            this.options = data.data;
          }
        },
        error: (err) => console.error('Error:', err),
      });
    }
  }

  //tabs
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  //MODAL
  openFilter() {
    this.filterVisible = true;
  }
  closeFilter(event?: Event) {
    this.filterVisible = false;
    event?.preventDefault();
  }
}
