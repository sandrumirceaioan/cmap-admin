import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminCasinosService {
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

  getCasinos(): Observable<any> {
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
      this.apiPath + '/casinos/list', { params: params }).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  getCasino(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id.toString());
    return this.http.get(
      this.apiPath + '/casinos/edit', { params: params }).pipe(
        map((result: any) => {
          return result;
        }),
        catchError((error) => {
          return throwError(error.error);
        })
      );
  }

  countCasinos(): Observable<any> {
    return this.http.get(this.apiPath + '/casinos/count', httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error)
      })
    );
  }

  countByReputation(): Observable<any> {
    return this.http.get(this.apiPath + '/casinos/countByReputation', httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error)
      })
    );
  }

  getReputation(score) {
    let reputation: string;
    switch (true) {
      case (score == 10):
        reputation = "PERFECT";
        break;
      case (score >= 9.5 && score < 10):
        reputation = "EXCELLENT";
        break;
      case (score >= 9 && score < 9.5):
        reputation = "SUPERB";
        break;
      case (score >= 8.5 && score < 9):
        reputation = "GREAT";
        break;
      case (score >= 8 && score < 8.5):
        reputation = "VERY GOOD";
        break;
      case (score >= 7.5 && score < 8):
        reputation = "GOOD";
        break;
      case (score >= 7 && score < 7.5):
        reputation = "FAIR";
        break;
      case (score < 7):
        reputation = "ACCEPTABLE";
        break;
    }
    return reputation;
  }

  updatePaymentMethodsData(params): Observable<any> {
    return this.http.post(this.apiPath + '/casinos/update-payment-methods-data', params, httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  updateCasino(id, params): Observable<any> {
    return this.http.put(this.apiPath + '/casinos/update/' + id, params, httpOptions).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((error) => {
        return throwError(error.error || error.error.message);
      })
    );
  }


}
