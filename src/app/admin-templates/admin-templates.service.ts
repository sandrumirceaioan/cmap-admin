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
export class AdminTemplatesService {
  apiPath = environment.apiEndpoint;
  backendPath = environment.backend;

  constructor(
    private http: HttpClient
  ) { }

  getAllTemplates(): Observable<any> {
    return this.http.get(
      this.apiPath + '/templates/all', httpOptions).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  addTemplate(params): Observable<any> {
    return this.http.post(this.apiPath + '/templates/add', params, httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error || error.error.message);
      })
    );
  }

  updateTemplate(id, params): Observable<any> {
    return this.http.put(this.apiPath + '/templates/update/' + id, params, httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error || error.error.message);
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

}
