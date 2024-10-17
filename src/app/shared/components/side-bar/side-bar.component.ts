import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { navBarData } from 'app/core/data/side-bar-data';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
  import { SideNavToggle } from './../../../core/interfaces/side-nav/side-nav-toggle';

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
    NgClass,
    NgIf,
NgFor
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Output() onToggleSideNav :EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed: boolean = true;
  screenWidth: number=0;
  navData = navBarData;
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed});
  }
}
