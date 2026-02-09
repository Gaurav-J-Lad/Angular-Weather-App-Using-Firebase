import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Keeps track of active requests
  private requestCount = 0;

  // Emits true = show loader, false = hide loader
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Observable used by components
  loading$ = this.loadingSubject.asObservable();

  /**
   * Call when an async task starts
   */
  show() {
    this.requestCount++;

    // If at least one request is running → show loader
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Call when an async task ends
   */
  hide() {
    this.requestCount--;

    // Safety check: never go below zero
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
    }
  }
}
