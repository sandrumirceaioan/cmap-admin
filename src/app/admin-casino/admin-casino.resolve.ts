import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AdminCasinosService } from '../admin-casinos/admin-casinos.service';
import { AdminSettingsService } from '../admin-settings/admin-settings.service';
import { AdminTemplatesService } from '../admin-templates/admin-templates.service';

@Injectable()
export class AdminCasinoResolve implements Resolve<any> {

    constructor(
        private adminCasinosService: AdminCasinosService,
        private adminTemplatesService: AdminTemplatesService,
        private toastr: ToastrService,
        private router: Router
      ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        return forkJoin([
            this.adminCasinosService.getCasino(route.params.id),
            this.adminTemplatesService.getGroupedTemplates()
        ]).pipe(
                map((result: any) => {
                    return {
                        casino: result[0],
                        templates: result[1]
                    };
                }),
                catchError((error) => {
                    this.toastr.error(error.message.error);
                    this.router.navigate([lastRoute]);
                    return Observable.throw(error);
                })
            );
    }
}
