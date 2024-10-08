import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TREE_DATA } from 'app/core/data/side-bar-data';
import { SideNavElements } from 'app/core/interfaces/side-nav-elements';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { CommonModule, NgClass } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NavigationIconComponent,
    NgClass,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  childrenAccessor = (node: SideNavElements) => node.children ?? [];
  dataSource = TREE_DATA;
  selectedTab: any = null;
  
  selectTab(childNode: any) {
    this.selectedTab = childNode;
    console.log(this.selectedTab);
  }
  hasChild = (_: number, node: SideNavElements) =>
    !!node.children && node.children.length > 0;
}
