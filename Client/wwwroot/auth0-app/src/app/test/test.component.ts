import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../_core/services/auth.service'

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['../app.component.scss']
})
export class TestComponent implements OnInit {

  message: string;

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.http.get(`${environment.apiUrl}/user/public`)
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

  public securedPing(): void {
    this.message = '';
    this.http.get(`${environment.apiUrl}/user/private`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

  public securedPrivatePing(): void {
    this.message = '';
    this.http.get(`${environment.apiUrl}/user/private-scoped`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

}
