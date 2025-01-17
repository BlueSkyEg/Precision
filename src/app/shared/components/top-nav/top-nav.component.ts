import { Component, Input } from '@angular/core';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { UserComponent } from '../user/user.component';
import { FilterDropdownMenuComponent } from '../filter-dropdown-menu/filter-dropdown-menue.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    BreadCrumbComponent,
    UserComponent,
    FilterDropdownMenuComponent,
    NgClass
],
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
  //BreadCrumbComponent
  @Input() items: any[] = [];
  //UserComponent
  @Input() user?: boolean = false;
  @Input() filter?: boolean = true;
}
