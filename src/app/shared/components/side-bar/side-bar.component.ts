import { Component, Output, EventEmitter } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule} from '@angular/common';
import { navBarData } from 'app/core/data/side-bar-data';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NavigationIconComponent,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  collapsed: boolean = false;
  navData = navBarData;
  @Output() collapseStateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapseStateChange.emit(this.collapsed);
  }
}
