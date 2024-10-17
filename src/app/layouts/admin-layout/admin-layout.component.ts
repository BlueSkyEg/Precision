import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavToggle } from 'app/core/interfaces/side-nav/side-nav-toggle';
import { SideBarComponent } from 'app/shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NgClass],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
isCollapsed: boolean = false;
screenWidth: number = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isCollapsed = data.collapsed;
  }
}
