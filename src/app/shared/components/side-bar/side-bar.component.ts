import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TREE_DATA, TREE_DATA_ICONS } from 'app/core/data/side-bar-data';
import { SideNavElements } from 'app/core/interfaces/side-nav-elements';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { CommonModule, NgClass } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NavigationIconComponent,
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
  dataSourceIcons = TREE_DATA_ICONS;
  selectedTab: any = null;
  @Input() isOpen: boolean = true;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
     this.isOpenChange.emit(this.isOpen);
  }
  selectTab(childNode: any) {
    this.selectedTab = childNode;
  }
  hasChild = (_: number, node: SideNavElements) =>
    !!node.children && node.children.length > 0;
}
