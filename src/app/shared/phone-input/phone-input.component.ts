import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownComponent],
  templateUrl: './phone-input.component.html'
})
export class PhoneInputComponent {
  isDropdownOpen:boolean = false;

  countryCodes = ['+20','+1','+44','+91'];
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
