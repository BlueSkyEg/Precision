import { Component,EventEmitter,Input, Output } from '@angular/core';
import { DocumentModel } from 'app/shared/interfaces/documents/document-model';
import { NavigationIconComponent } from "../../../../../core/icons/navigation-icons/navigation-icon.component";
import { ExtractFileNamePipe } from 'app/core/pipes/documents/extract-file-name.pipe';
import { MatIcon } from '@angular/material/icon';
import { FileViewerComponent } from "../../file-viewer/file-viewer.component";

@Component({
  selector: 'app-related-documents',
  standalone: true,
  imports: [NavigationIconComponent, ExtractFileNamePipe, MatIcon, FileViewerComponent],
  templateUrl: './related-documents.component.html',
})
export class RelatedDocumentsComponent {
  @Input() allFiles: DocumentModel[] = [];
  // Output event properly typed as emitting a string

  @Output() documentClick = new EventEmitter<string>();

  // Method to emit the event when a document is clicked
  onDocumentClick(fullName: string): void {
    this.documentClick.emit(fullName);
  }

  isPreviewOpen = false;
  currentPreviewLink: string | null = null;

  openPreview(previewLink: string): void {
    this.isPreviewOpen = true;
    this.currentPreviewLink = previewLink;
    console.log('previewLink', previewLink);
  }

  closePreview(): void {
    this.isPreviewOpen = false;
    this.currentPreviewLink = null;
  }
}
