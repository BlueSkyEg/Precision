import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './bread-crumb.component.html',
})
export class BreadCrumbComponent {
  @Input() items: any[] = [];
}
