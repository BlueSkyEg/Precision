import { Component, inject } from '@angular/core';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { SearchInputComponent } from 'app/shared/components/search-input/search-input.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quick-books',
  standalone: true,
  imports: [TopNavComponent ,SearchInputComponent,DropdownComponent],
  templateUrl: './quick-books.component.html'
})
export class QuickBooksComponent {
  companyName: string = '';
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Documents', routerLink: '/insights/documents' },
  ];

  //injected services
  private _DropDownStateService: DropdownStateService = inject(DropdownStateService);
  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.updateCompanyName();

    this.subscription = this._DropDownStateService.selectedBusiness$.subscribe(() => {
      this.updateCompanyName();
    });
  }

  ngOnDestroy(): void {
    // Cleanup the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCompanyName(): void {
    if (this._DropDownStateService.isBusinessSelected()) {
      const business = this._DropDownStateService.getSelectedBusiness();
      this.companyName = business?.companyName || '';
    } else {
      this.companyName = 'No Business Selected';
    }
  }
}
