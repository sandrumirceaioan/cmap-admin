import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        if (
            req.url.includes('/users/login')
        ) {
            return next.handle(req);
        }

        const token = localStorage.getItem('cboTokenA') || '';
        const authReq = req.clone({
            headers: req.headers.append("Authorization", `Bearer ${token}`)
        });
        return next.handle(authReq);
    }

}