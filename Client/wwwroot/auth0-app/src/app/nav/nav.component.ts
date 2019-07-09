import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { map, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { AuthService } from './../_core/services/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @ViewChild(MatSidenav) drawer: MatSidenav;

    isHandset$: Observable<boolean>;

    watcher: Subscription;
    isMobile: Boolean;
    isHandset: Boolean;

    constructor(private breakpointObserver: BreakpointObserver, mediaObserver: MediaObserver, public auth: AuthService, private overlay: OverlayContainer) {
    }

    ngOnInit() {

      // this.watcher = mediaObserver.asObservable()
      //   .pipe(
      //     filter((changes: MediaChange[]) => changes.length > 0),
      //     map((changes: MediaChange[]) => changes[0])
      //   ).subscribe((change: MediaChange) => {
      //     //this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      //     console.log(change.mqAlias);
      //     if ( change.mqAlias == 'sm' || change.mqAlias == 'xs') {
      //       //this.isMobile = true;
      //       //this.drawer.close();
      //       this.isHandset = true;
      //     }
      //     else{
      //       //this.isMobile = false;
      //       //this.drawer.open();
      //       this.isHandset = false;
      //     }
      //   });

      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
          this.isMobile = true;
        }
        else {
          this.isMobile = false;
        }
      });

      this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
          map(result => { 
            console.log('matches: ' + result.matches);
            return result.matches
          })
        );

      document.body.classList.add("custom-theme-dark", "mat-app-background");
      this.overlay.getContainerElement().classList.add("custom-theme-light");
    }

    toggleTheme(): void {

      if (this.overlay.getContainerElement().classList.contains("custom-theme-dark")) {
        this.overlay.getContainerElement().classList.remove("custom-theme-dark");
        this.overlay.getContainerElement().classList.add("custom-theme-light");
      } else if (this.overlay.getContainerElement().classList.contains("custom-theme-light")) {
        this.overlay.getContainerElement().classList.remove("custom-theme-light");
        this.overlay.getContainerElement().classList.add("custom-theme-dark");
      } else {
        this.overlay.getContainerElement().classList.add("custom-theme-light");
      }

      if (document.body.classList.contains("custom-theme-dark")) {
        document.body.classList.remove("custom-theme-dark");
        document.body.classList.add("custom-theme-light");
      } else if (document.body.classList.contains("custom-theme-light")) {
        document.body.classList.remove("custom-theme-light");
        document.body.classList.add("custom-theme-dark");
      } else {
        document.body.classList.add("custom-theme-light");
      }

    }

    toggleDrawer(){
      if(this.isMobile){
        this.drawer.toggle();
      }     
    }
}
