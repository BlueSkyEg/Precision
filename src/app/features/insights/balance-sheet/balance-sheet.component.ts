import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { NavigationIconComponent } from '../../../core/icons/navigation-icons/navigation-icon.component';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, NgClass } from '@angular/common';
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
  ],
  templateUrl: './balance-sheet.component.html',
})
export class BalanceSheetComponent {
  isDropdownOpen = false;
  isCompare = false;
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
  toggleIsCompare() {
    this.isCompare = !this.isCompare;
  }

  years: number[] = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018]; // Array of all years
  visibleYears: number[] = []; // Currently visible 9 years
  selectedYear: number | null = null; // Selected year
  maxVisibleYears: number = 9; // Number of years visible at once
  currentYear: number = new Date().getFullYear(); // Get the current year
  currentStartIndex: number = 0; // Index for the first visible year in the current set
  minYear: number = this.currentYear - 17; // Minimum year to be displayed (last 17 years)

  ngOnInit(): void {
    this.generateYears(); // Populate all years
    this.updateVisibleYears(); // Initialize visible years
  }

  // Generate a range of years, ensuring there are at least the last 17 years
  generateYears(): void {
    const startYear = Math.max(this.currentYear - 50, this.minYear); // Ensure no less than 17 years are available
    for (let year = startYear; year <= this.currentYear; year++) {
      this.years.push(year);
    }
  }

  // Update the years currently visible in the grid
  updateVisibleYears(): void {
    this.visibleYears = this.years.slice(
      this.currentStartIndex,
      this.currentStartIndex + this.maxVisibleYears
    );
  }

  // Handle year selection
  selectYear(year: number): void {
    this.selectedYear = year;
  }

  // Navigate to the previous set of 9 years
  previousYears(): void {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex -= this.maxVisibleYears;
      this.updateVisibleYears();
    }
  }

  // Navigate to the next set of 9 years
  nextYears(): void {
    if (this.currentStartIndex + this.maxVisibleYears < this.years.length) {
      this.currentStartIndex += this.maxVisibleYears;
      this.updateVisibleYears();
    }
  }
}
