import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AdminBonusesService } from './admin-bonuses.service';


@Injectable()
export class AdminBonusesResolve implements Resolve<any> {

    constructor(
        private adminBonusesService: AdminBonusesService,
        private toastr: ToastrService,
        private router: Router
      ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        return forkJoin([
            this.adminBonusesService.getBonuses()
        ]).pipe(
                map((result: any) => {
                    return {
                        bonuses: result[0]
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
