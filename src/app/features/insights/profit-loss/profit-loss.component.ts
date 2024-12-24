import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CompareComponent } from 'app/shared/components/compare/compare.component';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { TabsComponent } from 'app/shared/components/tabs/tabs.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-profit-loss',
  standalone: true,
  imports: [TopNavComponent, TabsComponent,NgIf,DropdownComponent,CompareComponent,NgFor],
  templateUrl: './profit-loss.component.html',
})
export class ProfitLossComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Profit & loos', routerLink: '/insights/profit-loos' },
  ];
  //tabs
  profitAndLossTabs: string[] = ['Monthly', 'Yearly', 'Percentage'];
  selectedTab: string = 'Monthly';
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  //dropdown
  toggleOptions: any[] = ['2012', '2013 ', '2014'];
  isDropdownOpen = false;
  isCompare = false;
  isShowResults = false;
  //exportdropdown
  options: any[] = ['export as pdf', 'export as svg ', 'option 4444444444'];
//table
  months=['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'];
}
