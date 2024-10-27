import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { NavigationIconComponent } from '../../../core/icons/navigation-icons/navigation-icon.component';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
interface Customer {
  id: number;
  name: string;
  company: string;
}

interface Tab {
  title: string;
  count: number;
  customers: Customer[];
}
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
export class TableComponent implements OnInit {
  @Input() tabs: Tab[]=[];
  selectedTabIndex = 0;
  searchQuery = '';
  currentPage = 0;
  rowsPerPage = 10;
  ngOnInit() {
    this.tabs = [
      {
        title: 'Accountants',
        count: 16,
        customers: this.getAccountants(), // Assign specific customers
      },
      {
        title: 'Clients',
        count: 23,
        customers: this.getClients(), // Assign specific customers
      },
      {
        title: 'Businesses',
        count: 2000,
        customers: this.getBusinesses(), // Assign specific customers
      },
    ];
  }
  getAccountants(): any {
    return [
      {
        id: 1000,
        name: 'James Butt',
        country: { name: 'Algeria', code: 'dz' },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        balance: 70663,
        pending: 5,
        awaiting: 10,
        reviewed: 2,
      },
      {
        id: 1001,
        name: 'Ana Trujillo',
        country: { name: 'Argentina', code: 'ar' },
        company: 'Trujillo Emporium',
        date: '2018-01-22',
        status: 'qualified',
        verified: false,
        activity: 32,
        representative: { name: 'Amy Elsner', image: 'amyelsner.png' },
        balance: 55434,
        pending: 2,
        awaiting: 8,
        reviewed: 3,
      },
      {
        id: 1002,
        name: 'Antonio Moreno',
        country: { name: 'Brazil', code: 'br' },
        company: 'Moreno & Sons',
        date: '2020-11-05',
        status: 'new',
        verified: true,
        activity: 45,
        representative: { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        balance: 90842,
        pending: 7,
        awaiting: 3,
        reviewed: 5,
      },
      {
        id: 1003,
        name: 'Thomas Hardy',
        country: { name: 'Canada', code: 'ca' },
        company: 'Hardy Trading',
        date: '2019-08-17',
        status: 'negotiation',
        verified: false,
        activity: 24,
        representative: {
          name: 'Bernardo Dominic',
          image: 'bernardodominic.png',
        },
        balance: 40312,
        pending: 4,
        awaiting: 6,
        reviewed: 8,
      },
      {
        id: 1004,
        name: 'Christina Berglund',
        country: { name: 'Denmark', code: 'dk' },
        company: 'Berglund Enterprises',
        date: '2017-04-23',
        status: 'qualified',
        verified: true,
        activity: 29,
        representative: { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
        balance: 67000,
        pending: 3,
        awaiting: 7,
        reviewed: 9,
      },
      {
        id: 1005,
        name: 'Hanna Moos',
        country: { name: 'Finland', code: 'fi' },
        company: 'Moos Partners',
        date: '2016-12-30',
        status: 'new',
        verified: false,
        activity: 38,
        representative: { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        balance: 89000,
        pending: 6,
        awaiting: 5,
        reviewed: 4,
      },
      {
        id: 1006,
        name: 'Frederique Citeaux',
        country: { name: 'France', code: 'fr' },
        company: 'Citeaux Industries',
        date: '2018-05-19',
        status: 'renewal',
        verified: true,
        activity: 15,
        representative: { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        balance: 12345,
        pending: 8,
        awaiting: 1,
        reviewed: 6,
      },
      {
        id: 1007,
        name: 'Martín Sommer',
        country: { name: 'Germany', code: 'de' },
        company: 'Sommer GmbH',
        date: '2021-02-01',
        status: 'unqualified',
        verified: false,
        activity: 5,
        representative: { name: 'Ivana Sims', image: 'ivanasims.png' },
        balance: 74250,
        pending: 9,
        awaiting: 4,
        reviewed: 7,
      },
      {
        id: 1008,
        name: 'Laurence Lebihan',
        country: { name: 'France', code: 'fr' },
        company: 'Lebihan International',
        date: '2022-03-14',
        status: 'qualified',
        verified: true,
        activity: 20,
        representative: { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        balance: 112233,
        pending: 10,
        awaiting: 2,
        reviewed: 1,
      },
      {
        id: 1009,
        name: 'Elizabeth Brown',
        country: { name: 'Australia', code: 'au' },
        company: 'Brown Trading',
        date: '2020-07-11',
        status: 'negotiation',
        verified: true,
        activity: 42,
        representative: { name: 'Howard Snyder', image: 'howardsnyder.png' },
        balance: 54321,
        pending: 1,
        awaiting: 9,
        reviewed: 3,
      },
      {
        id: 1010,
        name: 'Victoria Ashworth',
        country: { name: 'United Kingdom', code: 'uk' },
        company: 'Ashworth Ltd.',
        date: '2016-04-30',
        status: 'unqualified',
        verified: false,
        activity: 13,
        representative: { name: 'Alan Johnson', image: 'alanjohnson.png' },
        balance: 67890,
        pending: 6,
        awaiting: 10,
        reviewed: 4,
      },
      {
        id: 1011,
        name: 'Carlos Hernández',
        country: { name: 'Mexico', code: 'mx' },
        company: 'Hernández & Co.',
        date: '2017-06-14',
        status: 'qualified',
        verified: true,
        activity: 25,
        representative: { name: 'Jasmine Stark', image: 'jasminestark.png' },
        balance: 98765,
        pending: 7,
        awaiting: 5,
        reviewed: 9,
      },
      {
        id: 1012,
        name: 'Julia Andersen',
        country: { name: 'Norway', code: 'no' },
        company: 'Andersen Associates',
        date: '2018-09-21',
        status: 'new',
        verified: true,
        activity: 48,
        representative: { name: 'Sophie Turner', image: 'sophieturner.png' },
        balance: 34567,
        pending: 4,
        awaiting: 8,
        reviewed: 2,
      },
      {
        id: 1013,
        name: 'Mario Rossi',
        country: { name: 'Italy', code: 'it' },
        company: 'Rossi Enterprises',
        date: '2019-10-09',
        status: 'renewal',
        verified: false,
        activity: 33,
        representative: { name: 'Luca Bianchi', image: 'lucabianchi.png' },
        balance: 45678,
        pending: 9,
        awaiting: 6,
        reviewed: 7,
      },
      {
        id: 1014,
        name: 'Sophie Dubois',
        country: { name: 'France', code: 'fr' },
        company: 'Dubois Industries',
        date: '2021-01-17',
        status: 'unqualified',
        verified: true,
        activity: 50,
        representative: {
          name: 'Mathieu Leclerc',
          image: 'mathieuleclerc.png',
        },
        balance: 67543,
        pending: 2,
        awaiting: 3,
        reviewed: 8,
      },
      {
        id: 1015,
        name: 'Jane Smith',
        country: { name: 'USA', code: 'us' },
        company: 'Smith Corp',
        date: '2022-02-28',
        status: 'negotiation',
        verified: false,
        activity: 40,
        representative: { name: 'Martha Adams', image: 'marthaadams.png' },
        balance: 123456,
        pending: 5,
        awaiting: 7,
        reviewed: 10,
      },
      {
        id: 1016,
        name: 'Kofi Annan',
        country: { name: 'Ghana', code: 'gh' },
        company: 'Annan Partners',
        date: '2019-12-25',
        status: 'qualified',
        verified: true,
        activity: 60,
        representative: { name: 'John Doe', image: 'johndoe.png' },
        balance: 78900,
        pending: 3,
        awaiting: 9,
        reviewed: 5,
      },
      {
        id: 1017,
        name: 'Heike Schumacher',
        country: { name: 'Germany', code: 'de' },
        company: 'Schumacher & Sons',
        date: '2020-06-30',
        status: 'renewal',
        verified: true,
        activity: 22,
        representative: {
          name: 'Angela Hoffmann',
          image: 'angelahoffmann.png',
        },
        balance: 56789,
        pending: 4,
        awaiting: 6,
        reviewed: 8,
      },
      {
        id: 1018,
        name: 'Fatima Khaled',
        country: { name: 'Egypt', code: 'eg' },
        company: 'Khaled Importers',
        date: '2021-07-12',
        status: 'unqualified',
        verified: false,
        activity: 11,
        representative: { name: 'Ali Jaber', image: 'alijaber.png' },
        balance: 33333,
        pending: 6,
        awaiting: 5,
        reviewed: 7,
      },
      {
        id: 1019,
        name: 'Lina Törnvall',
        country: { name: 'Sweden', code: 'se' },
        company: 'Törnvall Holdings',
        date: '2023-04-10',
        status: 'new',
        verified: true,
        activity: 18,
        representative: {
          name: 'Björn Gustavsson',
          image: 'bjorngustavsson.png',
        },
        balance: 44444,
        pending: 10,
        awaiting: 2,
        reviewed: 6,
      },
    ];
  }

  getClients(): Customer[] {
    return [
      { id: 1002, name: 'Antonio Moreno', company: 'Moreno & Sons' },
      { id: 1003, name: 'Thomas Hardy', company: 'Hardy Trading' },
      // Add more clients as needed
    ];
  }

  getBusinesses(): Customer[] {
    return [
      { id: 1004, name: 'Christina Berglund', company: 'Berglund Enterprises' },
      { id: 1005, name: 'Hanna Moos', company: 'Moos Partners' },
      // Add more businesses as needed
    ];
  }
  get filteredCustomers(): Customer[] {
    const currentTab = this.tabs[this.selectedTabIndex];
    return currentTab.customers.filter((customer) =>
      customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedCustomers(): Customer[] {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredCustomers.slice(start, end);
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
