import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractFileName',
  standalone: true,
})
export class ExtractFileNamePipe implements PipeTransform {
  transform(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.split('/');
    return parts[parts.length - 2];
  }
}
