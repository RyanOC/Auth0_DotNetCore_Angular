import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { of } from 'rxjs/observable/of';
//import { Observable } from 'rxjs/Observable';
import { Observer, Observable } from 'rxjs/Rx'
import { environment } from '../../../environments/environment';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: environment.clientID,
    domain: environment.domain,
    responseType: 'token id_token',
    audience:  environment.audience,
    redirectUri: environment.callbackURL
  });

  userProfile: any;
  refreshSubscription: any;
  observer: Observer<boolean>;
  ssoAuthComplete$: Observable<boolean> = new Observable(
    obs => {
      console.log(`obs: ${obs}`);
      (this.observer = obs)
    }
  );

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log(`expiresAt: ${new Date(parseInt(expiresAt))}`);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }


  public renewToken() {
    console.log('renewToken..login');
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          alert(
            `Could not get a new token (${err.error}: ${err.error_description}).`
          );
          this.login();
        } else {
          this.setSession(result);
          //this.observer.next(true);
        }
      }
    );
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at')); // 30000

    const source = Observable.of(expiresAt).flatMap(expiresAt => {
      const now = Date.now(); // 0
      var s = new Date(parseInt(expiresAt)).toLocaleTimeString("en-US");
      console.log(`expiresAt: ${s}`)

      // Use the delay in a timer to
      // run the refresh at the proper time
      return Observable.timer(Math.max(1, expiresAt - now));
    });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

}