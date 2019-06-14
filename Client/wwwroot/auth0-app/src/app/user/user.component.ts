import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../_core/services/auth.service';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['../app.component.scss']
})
export class UserComponent implements OnInit {

  public profile: any;
  private http: HttpClient;
  message: string;

  constructor(public auth: AuthService, http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
    /*
    this.http.get<any>(`${environment.apiUrl}/user/info`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    }).subscribe(result => {
      this.profile = result;
    }, error => console.error(error));
*/
    var url = `${environment.apiUrl}/user/info`;
    var token = localStorage.getItem('access_token');

console.log(url);
console.log(token);

    this.http.get(`${environment.apiUrl}/user/info`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      }).subscribe(
      data => this.message = (data as IApiResponse).message,
      error => this.message = error
    );

  }

}
