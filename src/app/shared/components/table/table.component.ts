import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { NavigationIconComponent } from '../../../core/icons/navigation-icons/navigation-icon.component';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { IUser } from 'app/shared/interfaces/insights/user-model';
import { ITab } from 'app/shared/interfaces/insights/tab-model';
import { IBusinesses } from 'app/shared/interfaces/insights/business-model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    TabViewModule,
    CommonModule,
    NavigationIconComponent,
    FormsModule,
    PaginatorModule,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() tabs: ITab[] = [];
  @Output() userClick = new EventEmitter<{ id: string; type: string }>();
  @Output() tabChange = new EventEmitter<number>();
  @Input() isLoading: boolean = true;
  selectedTabIndex = 0;
  searchQuery = '';
  currentPage = 0;
  rowsPerPage = 10;
  get filteredUsers(): (IUser | IBusinesses)[] {
    const currentTab = this.tabs[this.selectedTabIndex];
    return currentTab.users.filter((user: IUser | IBusinesses) => {
      if ('profileName' in user && user.profileName) {
        return user.profileName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      } else if ('companyName' in user && user.companyName) {
        return user.companyName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      } else {
        return false;
      }
    });
  }

  get paginatedUsers(): (IUser | IBusinesses)[] {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredUsers.slice(start, end);
  }
  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
  }

  onTabChange(index: number) {
    this.searchQuery = '';
    this.currentPage = 0;
    this.tabChange.emit(index);
  }

  resetPagination() {
    this.currentPage = 0;
  }

  onRowClick(userId: string, userType: string) {
    this.userClick.emit({ id: userId, type: userType });
    this.selectedTabIndex = 2;
  }
  isUserType(): boolean {
    return (
      this.filteredUsers.length > 0 && 'profileName' in this.filteredUsers[0]
    );
  }

  isBusinessType(): boolean {
    return (
      this.filteredUsers.length > 0 && 'companyName' in this.filteredUsers[0]
    );
  }
}
