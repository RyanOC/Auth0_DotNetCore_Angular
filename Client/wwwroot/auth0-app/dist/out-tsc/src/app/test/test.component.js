import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../_core/services/auth.service';
var TestComponent = /** @class */ (function () {
    function TestComponent(auth, http) {
        this.auth = auth;
        this.http = http;
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    TestComponent.prototype.ping = function () {
        var _this = this;
        this.message = '';
        this.http.get(environment.API_URL + "/public")
            .subscribe(function (data) { return _this.message = data.message; }, function (error) { return _this.message = error; });
    };
    TestComponent.prototype.securedPing = function () {
        var _this = this;
        this.message = '';
        this.http.get(environment.API_URL + "/private", {
            headers: new HttpHeaders()
                .set('Authorization', "Bearer " + localStorage.getItem('access_token'))
        })
            .subscribe(function (data) { return _this.message = data.message; }, function (error) { return _this.message = error; });
    };
    TestComponent.prototype.securedPrivatePing = function () {
        var _this = this;
        this.message = '';
        this.http.get(environment.API_URL + "/private-scoped", {
            headers: new HttpHeaders()
                .set('Authorization', "Bearer " + localStorage.getItem('access_token'))
        })
            .subscribe(function (data) { return _this.message = data.message; }, function (error) { return _this.message = error; });
    };
    TestComponent = tslib_1.__decorate([
        Component({
            selector: 'test',
            templateUrl: './test.component.html',
            styleUrls: ['../app.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService, HttpClient])
    ], TestComponent);
    return TestComponent;
}());
export { TestComponent };
//# sourceMappingURL=test.component.js.map