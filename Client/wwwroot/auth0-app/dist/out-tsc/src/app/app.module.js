import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { NavComponent } from './nav/nav.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { AuthService } from './_core/services/auth.service';
var appRoutes = [
    { path: 'test', component: TestComponent },
    { path: 'home', component: HomeComponent },
    { path: 'person', component: PersonComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                NavComponent,
                TestComponent,
                HomeComponent,
                PersonComponent
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                AppRoutingModule,
                BrowserAnimationsModule,
                LayoutModule,
                MatToolbarModule,
                MatButtonModule,
                MatSidenavModule,
                MatIconModule,
                MatListModule,
                RouterModule.forRoot(appRoutes)
            ],
            providers: [AuthService],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map