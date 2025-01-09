import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() selectedTab: string = 'Pending';
  @Input() tabs: string[] = ['Pending', 'Updated', 'History'];
  @Output() tabsChanged = new EventEmitter();
  @Input() widthClass: 'full' | 'fit' = 'fit';
  @Input() isBoarded: boolean = true;
  @Input() amount:number=0;
  @Input() isHistory: boolean = false;
  selectTab(tab: string) {
    this.tabsChanged.emit(tab);
  }
  isFirst(tab: string): boolean {
    return this.tabs.indexOf(tab) === 0;
  }
  isLast(tab: string): boolean {
    return this.tabs.indexOf(tab) === this.tabs.length - 1;
  }
}
