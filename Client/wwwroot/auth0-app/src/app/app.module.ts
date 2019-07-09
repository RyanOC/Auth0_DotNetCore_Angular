import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { NavComponent } from './nav/nav.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './_core/services/auth.service';

const appRoutes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TestComponent,
    HomeComponent,
    UserComponent
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

export class AppModule { }