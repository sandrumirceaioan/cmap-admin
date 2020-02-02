import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AdminCasinosService } from './admin-casinos.service';

@Injectable()
export class AdminCasinosResolve implements Resolve<any> {

    constructor(
        private adminCasinosService: AdminCasinosService,
        private toastr: ToastrService,
        private router: Router
      ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        return forkJoin([
            this.adminCasinosService.getCasinos()
        ]).pipe(
                map((result: any) => {
                    return {
                        casinos: result[0]
                    };
                }),
                catchError((error) => {
                    this.toastr.error(error.message);
                    this.router.navigate([lastRoute]);
                    return Observable.throw(error);
                })
            );
    }
}
