import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { NavigationIconComponent } from '../../../core/icons/navigation-icons/navigation-icon.component';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgClass } from '@angular/common';
import { CompareComponent } from 'app/shared/components/compare/compare.component';
interface YearlyData {
  [year: string]: number;
}

interface AccountDetails {
  name: string;
  values: YearlyData;
}

interface Assets {
  Total: YearlyData;
  CurrentAssets: {
    Total: YearlyData;
    Details: AccountDetails[];
  };
}

interface BalanceSheet {
  Accounts: {
    Assets: Assets;
  };
}
@Component({
  selector: 'app-balance-sheet',
  standalone: true,
  imports: [
    TopNavComponent,
    NavigationIconComponent,
    DropdownComponent,
    MatNativeDateModule,
    CommonModule,
    CompareComponent
  ],
  templateUrl: './balance-sheet.component.html',
})
export class BalanceSheetComponent {
  isDropdownOpen = false;

  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Balance Sheet', routerLink: '/insights/balance-sheet' },
  ];
  options: any[] = ['export as pdf', 'export as svg ', 'option 4444444444'];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  expandedSections: { [key: string]: boolean } = {};

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  balanceSheet: BalanceSheet[] = [
    {
      Accounts: {
        Assets: {
          Total: {
            '2020': 300000,
            '2021': 350000,
            '2022': 400000,
            '2023': 450000,
            '2024': 500000,
            '2025': 550000,
          },
          CurrentAssets: {
            Total: {
              '2020': 150000,
              '2021': 175000,
              '2022': 200000,
              '2023': 225000,
              '2024': 250000,
              '2025': 275000,
            },
            Details: [
              {
                name: 'Cash',
                values: {
                  '2020': 50000,
                  '2021': 60000,
                  '2022': 70000,
                  '2023': 80000,
                  '2024': 90000,
                  '2025': 100000,
                },
              },
              {
                name: 'Receivables',
                values: {
                  '2020': 100000,
                  '2021': 115000,
                  '2022': 130000,
                  '2023': 145000,
                  '2024': 160000,
                  '2025': 175000,
                },
              },
            ],
          },
        },
      },
    },
  ];

}
