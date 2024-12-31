import { Component } from '@angular/core';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [TopNavComponent],
  templateUrl: './documents.component.html',
})
export class DocumentsComponent {
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Documents', routerLink: '/insights/documents' },
    {
      label: 'Documents Dashboard',
      routerLink: '/insights/documents/document-dashboard',
    },
  ];
}
