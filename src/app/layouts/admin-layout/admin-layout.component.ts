import { NgClass } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from 'app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NgClass ,SideBarComponent],
templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  collapsed: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth < 768) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCollapsedState = sessionStorage.getItem('sidebar-collapsed');
      if (storedCollapsedState !== null) {
        this.collapsed = JSON.parse(storedCollapsedState);
      }
    }
  }
  onCollapseChange(collapsed: boolean): void {
    this.collapsed = collapsed;
    sessionStorage.setItem('sidebar-collapsed', JSON.stringify(this.collapsed));
  }
}
