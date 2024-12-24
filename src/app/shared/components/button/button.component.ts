import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
@Input() buttonContent:string = "";
@Input() isBordered:boolean = false;
@Input() class: string = '';
@Input() isIcon:boolean = false;

}
