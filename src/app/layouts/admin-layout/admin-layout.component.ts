import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from 'app/shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NgClass],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isOpen: boolean = true;
  onSidebarToggle(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
}
