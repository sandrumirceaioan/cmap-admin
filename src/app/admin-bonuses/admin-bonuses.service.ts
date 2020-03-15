import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdminBonusesService {
  apiPath = environment.apiEndpoint;
  backendPath = environment.backend;

  page = {
    offset: 0,
    skip: 0,
    limit: 8,
    count: 0,
    orderBy: null,
    orderDir: null,
    search: null,
    filter: {
      published: null
    }
  };

  constructor(
    private http: HttpClient
  ) { }

  getBonuses(): Observable<any> {
    let params = new HttpParams();
    let skip = this.page.skip * this.page.offset;
    if (this.page.search) {
      params = params.append('search', this.page.search);
      skip = 0;
    }
    if (this.page.filter.published) {
      params = params.append('published', this.page.filter.published);
      skip = 0;
    }
    params = params.append('skip', skip.toString());
    params = params.append('limit', this.page.limit.toString());
    if (this.page.orderBy && this.page.orderDir) {
      params = params.append('orderBy', this.page.orderBy);
      params = params.append('orderDir', this.page.orderDir);
    }

    return this.http.get(
      this.apiPath + '/bonuses/list', { params: params }).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  getBonus(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get(
      this.apiPath + '/bonuses/edit', { params: params }).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  countBonuses(): Observable<any> {
    return this.http.get(this.apiPath + '/bonuses/count', httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error)
      })
    );
  }

  updateBonus(id, params): Observable<any> {
    return this.http.put(this.apiPath + '/bonuses/update/' + id, params, httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error || error.error.message);
      })
    );
  }

  deleteBonus(id): Observable<any> {
    return this.http.delete(this.apiPath + '/bonuses/delete/' + id).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error || error.error.message);
      })
    );
  }



}
