import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {
  apiPath = environment.apiEndpoint;
  backendPath = environment.backend;

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<any> {
    return this.http.get(
      this.apiPath + '/countries/all', httpOptions).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  getAllProviders(): Observable<any> {
    return this.http.get(
      this.apiPath + '/providers/all', httpOptions).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  getAllPayments(): Observable<any> {
    return this.http.get(
      this.apiPath + '/payments/all', httpOptions).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  getProviders(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get(
      this.apiPath + '/providers/casino', { params: params }).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  updateProvider(params): Observable<any> {
    return this.http.put(this.apiPath + '/providers/update', params).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

    updatePayment(params): Observable<any> {
    return this.http.put(this.apiPath + '/payments/update', params).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  search(path, search): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', search.toString());
    return this.http.get(
      this.apiPath + '/'+ path +'/search', { params: params }).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  //   updateInfo(params): Observable<any> {
  //     return this.http.post(this.apiPath + '/advertiser/update', params, httpOptions).pipe(
  //       map((result: any) => {
  //           return result;
  //       }),
  //       catchError((error) => {
  //         return throwError(error.error.message || this.errorService.errorList(error.error));
  //       })
  //     );
  //   }


}
