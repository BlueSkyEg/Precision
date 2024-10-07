import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TREE_DATA } from 'app/core/data/side-bar-data';
import { SideNavElements } from 'app/core/interfaces/side-nav-elements';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { NgClass, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NavigationIconComponent,
    NgClass,
    NgIf,
    NgFor
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  childrenAccessor = (node: SideNavElements) => node.children ?? [];

  dataSource = TREE_DATA;
  selectedTab: any = null;

  // This function handles selecting a tab
  selectTab(childNode: any) {
    this.selectedTab = childNode;
    console.log(this.selectedTab)
  }
  isChildOfDashboard(node: any): boolean {
    const parentNode = this.getParentNode(node);
    return (
      (parentNode && parentNode.name === 'Dashboard') ||
      (parentNode && parentNode.name === 'Documents')
    );
  }

  getParentNode(node: any): any {
    return this.findParentNode(this.dataSource, node);
  }

  findParentNode(nodes: any[], childNode: any, parent: any = null): any {
    for (let node of nodes) {
      if (node === childNode) {
        return parent;
      }
      if (node.children && node.children.length > 0) {
        const found = this.findParentNode(node.children, childNode, node);
        if (found) return found;
      }
    }
    return null;
  }

  hasChild = (_: number, node: SideNavElements) =>
    !!node.children && node.children.length > 0;
}
