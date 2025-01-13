import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
@Component({
  selector: 'app-file-viewer',
  standalone: true,
  imports: [CommonModule, NgxDocViewerModule
  ],
  templateUrl: './file-viewer.component.html'
})
export class FileViewerComponent {
  @Input() fileUrl: any ='';
}
