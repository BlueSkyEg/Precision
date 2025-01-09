import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  /*
  - Mobile Side Nav
  */
  sideNavSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /*
  - Progress Bar
  - The loader that will appear with every http request
  */
  loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
