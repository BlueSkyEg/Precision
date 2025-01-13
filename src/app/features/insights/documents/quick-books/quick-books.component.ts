import { Component, inject } from '@angular/core';
import { DropdownStateService } from 'app/core/services/dropdown-state/dropdown-state.service';
import { DropdownComponent } from 'app/shared/components/dropdown/dropdown.component';
import { SearchInputComponent } from 'app/shared/components/search-input/search-input.component';
import { TopNavComponent } from 'app/shared/components/top-nav/top-nav.component';
import { Subscription } from 'rxjs';
import { NavigationIconComponent } from "../../../../core/icons/navigation-icons/navigation-icon.component";
import { DocumentsService } from 'app/core/services/documents/documents.service';
import { DocumentModel } from 'app/shared/interfaces/documents/document-model';
import { ExtractFileNamePipe } from 'app/core/pipes/documents/extract-file-name.pipe';
import { Router } from '@angular/router';
import { AllDocumentsComponent } from "./all-documents/all-documents.component";
import { RelatedDocumentsComponent } from "./related-documents/related-documents.component";

@Component({
  selector: 'app-quick-books',
  standalone: true,
  imports: [
    TopNavComponent,
    SearchInputComponent,
    DropdownComponent,
    AllDocumentsComponent,
    RelatedDocumentsComponent,
  ],
  templateUrl: './quick-books.component.html',
})
export class QuickBooksComponent {
  //properties
  companyName: string = '';
  companyId: string = '';
  searchQuery: string = '';
  selectedDocument: string = '';
  AllDocuments: DocumentModel[] = [];
  AllFiles: DocumentModel[] = [];
  showAllDocuments: boolean = false;
  breadcrumbItems: any[] = [
    { label: 'Insights', routerLink: '/insights' },
    { label: 'Documents', routerLink: '/insights/documents' },
  ];
  options = ['All', 'Pdf', 'Csv'];
  //injected services
  private _DropDownStateService: DropdownStateService =
    inject(DropdownStateService);
  private _Documents: DocumentsService = inject(DocumentsService);
  private subscription: Subscription | null = null;
  private _Router: Router = inject(Router);

  ngOnInit(): void {
    this.updateCompanyName();

    this.subscription = this._DropDownStateService.selectedBusiness$.subscribe(
      () => {
        this.updateCompanyName();
      }
    );
  }

  ngOnDestroy(): void {
    // Cleanup the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCompanyName(): void {
    if (this._DropDownStateService.isBusinessSelected()) {
      const business = this._DropDownStateService.getSelectedBusiness();
      this.companyName = business?.companyName || '';
      this.companyId = business?.companyId || '';
      this.getDocuments();
    } else {
      this.companyName = 'No Business Selected';
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query;
  }

  //get allDocuments
  getDocuments(): void {
    this._Documents.getDocuments(this.companyId).subscribe({
      next: (data) => {
        if (data.succeeded) {
          this.showAllDocuments = true;
          this.AllDocuments = data.data;
          console.log(this.AllDocuments);
        }
      },
      error: (err) => console.error('Error:', err),
    });
  }
  //get allDocuments By DocumentName
  getDocumentsByDocumentName(documentName: string): void {
    if (this.AllDocuments.length > 0) {
      const fileName = this.extractFileName(documentName);
      this._Documents.getDocuments(this.companyId, fileName).subscribe({
        next: (data) => {
          this.showAllDocuments = false;
          this.AllFiles = data.data;
        },
        error: (err) => console.error('Error:', err),
      });
    }
  }
  //get allDocuments By DocumentName Second level
  getDocumentsByDocumentNameSecondLevel(documentName: string): void {
    if (this.AllDocuments.length > 0) {
      const fileName = this.extractFileNameSecondLevel(documentName);
      console.log(fileName);
      this._Documents.getDocuments(this.companyId, fileName).subscribe({
        next: (data) => {
          this.showAllDocuments = false;
          this.AllFiles = data.data;
        },
        error: (err) => console.error('Error:', err),
      });
    }
  }
  private extractFileName(fullName: string): string {
    const parts = fullName.split('/');
    return parts[parts.length - 2] || '';
  }

  private extractFileNameSecondLevel(fullName: string): string {
    const segments = fullName.split('/');
    if (segments.length >= 2) {
      return `${segments[segments.length - 3]}/${segments[segments.length - 2]
        }`;
    } else {
      return fullName; // Return the original string if there aren't enough segments
    }
  }
}
