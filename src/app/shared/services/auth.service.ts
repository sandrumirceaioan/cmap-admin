import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiPath = environment.apiEndpoint;
  logged: any;

  constructor(
    private http: HttpClient
  ) { }

  login(params): Observable<any> {
    return this.http.post(this.apiPath + '/users/login', params, httpOptions).pipe(
      map((result: any) => {
          localStorage.setItem('cboTokenA', result.token);
          this.logged = result.user;
          return result.user;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error.error.message);
      })
    );
  }

  register(params): Observable<any> {
    return this.http.post(this.apiPath + '/users/register', params, httpOptions).pipe(
      map((result: any) => {
        this.logged = result.user;
          return result;
      }),
      catchError((error) => {
        return throwError(error.message);
        
      })
    );
  }

  verify() {
    return this.http.get(this.apiPath + '/users/verify', httpOptions).pipe(
      map((result: any) => {
          this.logged = result;
          return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }


}
