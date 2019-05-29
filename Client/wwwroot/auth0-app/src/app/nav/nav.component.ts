import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { map, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { AuthService } from './../_core/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @ViewChild(MatSidenav) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    watcher: Subscription;
    isMobile: Boolean;

    constructor(private breakpointObserver: BreakpointObserver, mediaObserver: MediaObserver, public auth: AuthService) {
  
      this.watcher = mediaObserver.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      ).subscribe((change: MediaChange) => {
        //this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
        if ( change.mqAlias == 'sm' || change.mqAlias == 'xs') {
          this.isMobile = true;
        }
        else{
          this.isMobile = false;
          this.drawer.open();
        }
      });
  
    }

    toggleDrawer(){
      if(this.isMobile){
        this.drawer.toggle();
      }     
    }
}
