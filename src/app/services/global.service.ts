import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { Login } from './../pages/home/login-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLogged = new Subject();
  onHttpLogin = new Subject();
  onHttpGetProfile = new Subject();
  onHttpGetTicket = new Subject();
  onHttpViewTicket = new Subject();
  onHttpUpdateProfile = new Subject();

  constructor(private http: HttpClient) {

  }

  httpLogin(logins: Login) {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    this.http.post(url, logins).subscribe(
      (response: any) => {
        console.log('success response', response);
        if (response.status == 'success') {
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
        }
      },
      (error) => {
        console.log('error response', error);

      }
    );
  }

  httpGetTicket(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        console.log('this is from httpGetTicket service', response);
        if (response.status === 'success') {
          this.onHttpGetTicket.next(response.data);
        }
      },
      (error) => {
        console.log('error response in httpGetTicket', error);
      }
    );
  }

  httpViewTicket(id:string): void {
  const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my/' + id;
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        console.log('this is from httpViewTicket service', response);
        if (response.status === 'success') {
          this.onHttpViewTicket.next(response.data);
        }
      },
      (error) => {
        console.log('error response in httpViewTicket', error);
      }
    );
  }

  httpGetProfile(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        console.log('this is from httpGetProfile service', response);
        if (response.status === 'success') {
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('error response in httpGetProfile', error);
      }
    );
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url, data, {
      headers: new HttpHeaders(). set('Authorization', 'Bearer ' + token )
    }).subscribe(
      (response: any) => {
        console.log('this is from http update profile service', response);

        if (response.status === 'success') {
          this.onHttpUpdateProfile.next(response.data);
        }
      }
    )
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token?.toString() || ''; // return token;
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
