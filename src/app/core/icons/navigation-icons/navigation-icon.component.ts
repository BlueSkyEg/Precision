import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation-icon',
  imports: [NgStyle],
  template: ` <div
    [innerHTML]="sanitizedSvgContent"
    [ngStyle]="{ color: iconColor }"
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
  sanitizedSvgContent!: SafeHtml;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.loadSvg();
  }
  loadSvg() {
    const svgPath = `assets/icons/navigation/${this.iconName}.svg`;

    this.http.get(svgPath, { responseType: 'text' }).subscribe(
      (svgContent) => {
        // Replace the 'fill' attribute with 'currentColor' to allow CSS color control
        const updatedSvg = svgContent.replace(
          /fill="[^"]*"/g,
          'fill="currentColor"'
        );
        // Sanitize and assign the SVG content to be displayed
        this.sanitizedSvgContent =
          this.sanitizer.bypassSecurityTrustHtml(updatedSvg);
      },
      (error) => {
        console.error('Error loading SVG:', error);
      }
    );
  }
  get iconPath(): string {
    return `assets/icons/navigation/${this.iconName}.svg`;
  }
}
