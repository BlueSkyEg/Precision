import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { PhoneInputComponent } from 'app/shared/phone-input/phone-input.component';
import { DropdownComponent } from "../../../../../shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ButtonComponent, PhoneInputComponent, DropdownComponent],
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent  {
  countries=[
    "Alex,Egypt",
    "Cairo ,Egypt",
    "Beijing,China",
    "Shanghai,China",
    "Tokyo,Japan",
    "Seoul,South Korea",
    "Moscow,Russia",
  ]
}
