import { Component, Input } from '@angular/core';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { UserComponent } from '../user/user.component';
import { FilterDropdownMenuComponent } from '../filter-dropdown-menu/filter-dropdown-menue.component';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    BreadCrumbComponent,
    UserComponent,
    FilterDropdownMenuComponent,
],
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
  //BreadCrumbComponent
  @Input() items: any[] = [];
  //UserComponent
  @Input() userName!: string;
  @Input() pcName!: string;
  @Input() userIconName: string = 'user';
  @Input() pcIconName: string = 'monitor';
  @Input() user?: boolean = false;
  @Input() filter?: boolean = true;
}
