import { CommonModule } from '@angular/common';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OverlayComponent } from 'app/shared/components/transactions/overlay/overlay.component';
import { ModalComponent } from 'app/shared/components/modal/modal.component';
import { TabsComponent } from 'app/shared/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from 'app/shared/components/custome-table/custom-table.component';
import { ITransactions } from 'app/shared/interfaces/insights/itransactions';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { IBusinesses } from 'app/shared/interfaces/insights/ibusinesses';
import { TransactionsService } from 'app/core/services/transactions/transactions.service';
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
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Transactions', routerLink: '/insights/transactions' },
  ];
  transactionTabs: string[] = ['Pending', 'Updated', 'History'];
  selectedTab: string = 'Pending';
  filterVisible: boolean = false;
  selectedBusiness: IBusinesses | null = null;
  isBusinessSelected: boolean = false;

  //choose account
  selectedAccountsCount: number = 0;
  pendingTransactions: ITransactions[] = [];
  updatedTransactions: ITransactions[] = [];
  //Injected services
  private dropdownStateService: DropdownStateService = inject(DropdownStateService);
  private transactionService: TransactionsService = inject(TransactionsService);
  ngOnInit(): void {
    // Subscribe to the selected business state
    this.dropdownStateService.selectedBusiness$.subscribe((business) => {
      this.selectedBusiness = business;
      this.isBusinessSelected = business !== null;

      if (this.isBusinessSelected) {
        this.getPendingTransactions();

      }
    });

  }

  get businessId() {
    if (this.selectedBusiness) {
      return this.selectedBusiness.companyId;
    }
    return null;
  }
  getPendingTransactions():void{
    if (this.businessId) {
      this.transactionService.getPendingTransactions(this.businessId).subscribe({
        next: (data) => {
          if (data.succeeded == true) {
            console.log(data)
            this.pendingTransactions = data.data;

          }

        },
        error: (err) => console.error('Error:', err),
      });
    }
  }

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
