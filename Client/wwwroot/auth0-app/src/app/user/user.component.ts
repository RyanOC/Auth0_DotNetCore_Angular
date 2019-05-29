import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../_core/services/auth.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['../app.component.scss']
})
export class UserComponent implements OnInit {

  public profile: any;
  private http: HttpClient;

  constructor(public auth: AuthService, http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/user/info`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    }).subscribe(result => {
      this.profile = result;
    }, error => console.error(error));
  }

}
