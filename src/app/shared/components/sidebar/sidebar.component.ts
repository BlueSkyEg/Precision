import { Component, Output, EventEmitter, OnInit, Inject, PLATFORM_ID, HostListener, inject } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationIconComponent } from 'app/core/icons/navigation-icons/navigation-icon.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SideNavElements } from 'app/core/interfaces/side-nav/side-nav-elements';
import { AuthService } from 'app/core/services/auth/auth.service';
import { UsersService } from 'app/core/services/users/users.service';
import { getNavBarData } from 'app/core/data/side-bar-data';
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
  templateUrl: './sidebar.component.html',
})
export class SideBarComponent implements OnInit {
  collapsed: boolean = false;
  userId: string = '';
  userData: any = null;
  userRole: string = '';
  isProfileEditsOpen: boolean = false;
  _AuthService: AuthService = inject(AuthService);
  _UserService: UsersService = inject(UsersService);
  _Router: Router = inject(Router);
  navData: SideNavElements[] = [];
  @Output() collapseStateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    this.getUserInfo();
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
  onResize(): void {
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
    if (this.isProfileEditsOpen) {
      this.isProfileEditsOpen = false;
      this.collapseAllChildren(item);
    }
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

  //user profile information

  get UserId() {
    return this._AuthService.saveUserData().Id;
  }
  getUserInfo() {
    this._UserService.getuserById(this.UserId).subscribe((data: any) => {
      this.userData = data.data;
    });
    this.userRole = this._AuthService.saveUserData().Role;
    this.navData = getNavBarData(this.userRole);
  }

  toggleProfile() {
    if (this.isProfileEditsOpen) {
      this.isProfileEditsOpen = false;
      this.navData.forEach((item) => this.collapseAllChildren(item));
    } else {
      this.isProfileEditsOpen = true;
      this.navData.forEach((item) => this.collapseAllChildren(item));
    }
  }
  profileInfo() {
    this._Router.navigate(['/insights/profile']);
  }
  logOut() {
    this._AuthService.Logout();
  }
}
