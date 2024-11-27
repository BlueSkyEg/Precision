import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [NgClass],
  templateUrl: './overlay.component.html',
})
export class OverlayComponent {
  @Input() modalVisible: boolean = false;
}
