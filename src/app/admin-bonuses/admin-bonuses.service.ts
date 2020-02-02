import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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

  constructor(
    private http: HttpClient
  ) { }

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
