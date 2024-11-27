import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation-icon',
  imports: [NgStyle],
  template: ` <div
    [innerHTML]="sanitizedSvgContent"
    [ngStyle]="{
      color: iconColor,
      transform: isRotated ? 'rotate(180deg)' : 'none'
    }"
  ></div>`,
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
  @Input() iconColor: string = 'currentColor';
  @Input() iconType: 'navigation' | 'search' | 'common' = 'navigation';
  @Input() isRotated: boolean = false;
  sanitizedSvgContent!: SafeHtml;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.loadSvg();
  }

  loadSvg() {
    const basePath =
      this.iconType === 'navigation'
        ? 'assets/icons/navigation/'
        : this.iconType === 'search'
        ? 'assets/icons/search-bar/'
        : 'assets/icons/common/';
    const svgPath = `${basePath}${this.iconName}.svg`;

    this.http.get(svgPath, { responseType: 'text' }).subscribe(
      (svgContent) => {
        const updatedSvg = svgContent.replace(
          /fill="[^"]*"/g,
          'fill="currentColor"'
        );
        this.sanitizedSvgContent =
          this.sanitizer.bypassSecurityTrustHtml(updatedSvg);
      },
      (error) => {
        console.error('Error loading SVG:', error);
      }
    );
  }
}
