import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MediaObserver } from '@angular/flex-layout';
import { map, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { AuthService } from './../_core/services/auth.service';
var NavComponent = /** @class */ (function () {
    function NavComponent(breakpointObserver, mediaObserver, auth) {
        var _this = this;
        this.breakpointObserver = breakpointObserver;
        this.auth = auth;
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(map(function (result) { return result.matches; }));
        this.watcher = mediaObserver.asObservable()
            .pipe(filter(function (changes) { return changes.length > 0; }), map(function (changes) { return changes[0]; })).subscribe(function (change) {
            //this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
            if (change.mqAlias == 'sm' || change.mqAlias == 'xs') {
                _this.isMobile = true;
            }
            else {
                _this.isMobile = false;
                _this.drawer.open();
            }
        });
    }
    NavComponent.prototype.toggleDrawer = function () {
        if (this.isMobile) {
            this.drawer.toggle();
        }
    };
    tslib_1.__decorate([
        ViewChild(MatSidenav),
        tslib_1.__metadata("design:type", MatSidenav)
    ], NavComponent.prototype, "drawer", void 0);
    NavComponent = tslib_1.__decorate([
        Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [BreakpointObserver, MediaObserver, AuthService])
    ], NavComponent);
    return NavComponent;
}());
export { NavComponent };
//# sourceMappingURL=nav.component.js.map