import { Component, Output, EventEmitter, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { navBarData } from 'app/core/data/side-bar-data';
import { SideNavElements } from 'app/core/interfaces/side-nav/side-nav-elements';
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
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  collapsed: boolean = false;
  navData = navBarData;
  @Output() collapseStateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCollapsedState = sessionStorage.getItem('sidebar-collapsed');
      if (storedCollapsedState !== null) {
        this.collapsed = JSON.parse(storedCollapsedState);
      }
      const storedNavState = localStorage.getItem('sidebar-nav-state');
      if (storedNavState !== null) {
        const savedNavState = JSON.parse(storedNavState);
        this.navData = this.restoreExpandedState(this.navData, savedNavState);
      }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize( ): void {
    if (window.innerWidth < 768) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapseStateChange.emit(this.collapsed);
    sessionStorage.setItem('sidebar-collapsed', JSON.stringify(this.collapsed));
  }
  toggleExpand(item: SideNavElements, parentItems: SideNavElements[]): void {
    parentItems.forEach((parentItem) => {
      if (parentItem !== item) {
        this.collapseAllChildren(parentItem);
        parentItem.expanded = false;
      }
    });
    item.expanded = !item.expanded;
    this.saveNavState();
  }
  collapseAllChildren(item: SideNavElements): void {
    item.expanded = false;
    if (item.children) {
      item.children.forEach((child) => {
        this.collapseAllChildren(child);
      });
    }
  }
  saveNavState(): void {
    const navState = this.navData.map((item) => this.getItemState(item));
    localStorage.setItem('sidebar-nav-state', JSON.stringify(navState));
  }

  getItemState(item: SideNavElements): any {
    return {
      name: item.name,
      expanded: item.expanded,
      children: item.children
        ? item.children.map((child) => this.getItemState(child))
        : null,
    };
  }

  restoreExpandedState(
    navItems: SideNavElements[],
    savedState: any[]
  ): SideNavElements[] {
    return navItems.map((item) => {
      const savedItem = savedState.find(
        (stateItem) => stateItem.name === item.name
      );
      if (savedItem) {
        item.expanded = savedItem.expanded;
        if (item.children && savedItem.children) {
          item.children = this.restoreExpandedState(
            item.children,
            savedItem.children
          );
        }
      }
      return item;
    });
  }
}
