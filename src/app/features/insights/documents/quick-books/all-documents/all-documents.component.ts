import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DocumentModel } from 'app/shared/interfaces/documents/document-model';
import { NavigationIconComponent } from "../../../../../core/icons/navigation-icons/navigation-icon.component";
import { ExtractFileNamePipe } from 'app/core/pipes/documents/extract-file-name.pipe';

@Component({
  selector: 'app-all-documents',
  standalone: true,
  imports: [NavigationIconComponent, ExtractFileNamePipe],
  templateUrl: './all-documents.component.html',
})
export class AllDocumentsComponent {
  //properties
  @Input() companyId: string = '';
  @Input() AllDocuments: DocumentModel[] = [];
  // Output event properly typed as emitting a string

  @Output() documentClick = new EventEmitter<string>();

  // Method to emit the event when a document is clicked
  onDocumentClick(fullName: string): void {
    this.documentClick.emit(fullName);
  }
}
