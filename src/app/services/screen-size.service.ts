import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  smallScreen$: Observable<BreakpointState> =
    this.breakpointObserver.observe('(max-width:768px)');
  private openedSidebar = new BehaviorSubject<boolean>(true);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.smallScreenSubscription();
  }
  smallScreenSubscription() {
    this.smallScreen$.subscribe((state) => {
      if (state.matches) {
        this.openedSidebar.next(false);
      } else {
        this.openedSidebar.next(true);
      }
    });
  }

  getOpened(): Observable<boolean> {
    return this.openedSidebar.asObservable();
  }
}
