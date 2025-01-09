import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'precision';

  _Loader: LoaderService = inject(LoaderService);
  displayLoader: boolean = false;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  ngOnInit(): void {
    // Display Loader
    this._Loader.loaderSubject.asObservable().subscribe({
      next: (value) => {
        this.displayLoader = value;
        this.cdr.detectChanges();
      },
    });

  }
}
