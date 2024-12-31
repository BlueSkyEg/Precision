import { Component, inject, Input } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavigationIconComponent],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() userName!: string;
  @Input() pcName!: string;
  @Input() userIconName: string = 'user';
  @Input() pcIconName: string = 'monitor';
  dropdownStateService = inject(DropdownStateService);
  ngOnInit() {
    console.log(this.business)
  }
  get business() {
    return this.dropdownStateService.getSelectedBusiness();
  }
}
