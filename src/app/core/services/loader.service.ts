import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private showLoaderSubject = new BehaviorSubject(false);
  private showLoaderState = false;
  private pendingRequests = 0;

  getShowLoader(): Observable<boolean> {
    return this.showLoaderSubject.asObservable();
  }

  hideLoader(): void {
    this.showLoaderState = false;
    this.showLoaderSubject.next(this.showLoaderState);
  }

  showLoader(): void {
    this.showLoaderState = true;
    this.showLoaderSubject.next(this.showLoaderState);
  }

  turnOnRequest(): void {
    this.pendingRequests++;
    this.showLoader();
  }

  turnOffRequest(): void {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      this.hideLoader();
    }
  }
}
