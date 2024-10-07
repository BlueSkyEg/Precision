import {
 Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-icon',
  template: `<img [src]="iconPath" alt="{{ iconName }} icon" class="w-6 h-6" />`,
  styles: [
    `
      svg {
        fill: currentColor;
      }
    `,
  ],
  standalone: true,
})
export class NavigationIconComponent {
  @Input() iconName!: string;

  get iconPath(): string {
    return `assets/icons/navigation/${this.iconName}.svg`;
  }
}
