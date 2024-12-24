import { Component } from '@angular/core';
import { NavigationIconComponent } from "../../../../core/icons/navigation-icons/navigation-icon.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { PhoneInputComponent } from "../../../../shared/phone-input/phone-input.component";
import { DropdownComponent } from "../../../../shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-sub-profiles',
  standalone: true,
  imports: [NavigationIconComponent, ButtonComponent, PhoneInputComponent, DropdownComponent],
  templateUrl: './sub-profiles.component.html'
})
export class SubProfilesComponent {
  Companies = [
    "Google Inc",
    "Facebook Inc",
    "Apple Inc",
    "Microsoft Corp",
    "Netflix Inc",
    "Amazon Inc",
  ]
}
