import { Component, Input } from '@angular/core';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { UserComponent } from '../user/user.component';
import { FilterDropdownMenueComponent } from '../filter-dropdown-menue/filter-dropdown-menue.component';
import { NavigationIconComponent } from "../../../core/icons/navigation-icons/navigation-icon.component";

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [BreadCrumbComponent, UserComponent, FilterDropdownMenueComponent, NavigationIconComponent],
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
}
