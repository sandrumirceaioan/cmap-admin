import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AdminSettingsService } from './admin-settings.service';

@Injectable()
export class AdminSettingsResolve implements Resolve<any> {

    constructor(
        private adminSettingsService: AdminSettingsService,
        private toastr: ToastrService,
        private router: Router
      ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        return forkJoin([
            this.adminSettingsService.getCountries(),
            this.adminSettingsService.getAllProviders(),
            this.adminSettingsService.getAllPayments(),
        ]).pipe(
                map((result: any) => {
                    return {
                        countries: result[0],
                        providers: result[1],
                        payments: result[2]
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
