import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [NavigationIconComponent,NgFor],
  templateUrl: './compare.component.html'
})
export class CompareComponent {
  isCompare = false;
  isShowResults = false;
  toggleIsCompare() {
    this.isCompare = !this.isCompare;
  }

  years: number[] = []; // Array of all years

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

  showResults(): void {
    this.isShowResults = true;
    this.isCompare = false;
  }
  clearAll(): void {
    this.isShowResults = false;
    this.selectedYear = null;
    this.isCompare = false;
  }
}
