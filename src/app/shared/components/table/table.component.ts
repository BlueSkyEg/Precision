import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { NavigationIconComponent } from '../../../core/icons/navigation-icons/navigation-icon.component';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { IUser } from 'app/shared/interfaces/insights/iuser';
import { ITab } from 'app/shared/interfaces/insights/itab';



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
  selectedTabIndex = 0;
  searchQuery = '';
  currentPage = 0;
  rowsPerPage = 10;

  get filteredUsers(): IUser[] {
    const currentTab = this.tabs[this.selectedTabIndex];
    return currentTab.users.filter((user) =>
      user.qbMemberName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedUsers(): IUser[] {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
  }

  onTabChange() {
    this.searchQuery = '';
    this.currentPage = 0;
  }

  resetPagination() {
    this.currentPage = 0;
  }
}
