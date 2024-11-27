import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { TabsComponent } from '../tabs/tabs.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    NavigationIconComponent,
    DateRangeComponent,
    TabsComponent,
    DropdownComponent,
    FormsModule,
    NavigationIconComponent,
  ],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() modalVisible: boolean = false;
  @Input() isFilter: boolean = false;
  @Output() ModalClosed = new EventEmitter();
  @Input() data: any = null;
  EditTabs = ['Submission', 'History'];
  selectedTab: string = 'Submission';
  options: any[] = ['suspense', 'Option1', 'Option2', 'Option3'];

  closeModal(event?: Event) {
    this.ModalClosed.emit(event);
  }
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
