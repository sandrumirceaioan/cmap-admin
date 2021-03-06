import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AdminTemplatesService } from './admin-templates.service';

@Injectable()
export class AdminTemplatesResolve implements Resolve<any> {

    constructor(
        private adminTemplatesService: AdminTemplatesService,
        private toastr: ToastrService,
        private router: Router
      ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lastRoute = this.router.url;
        return forkJoin([
            this.adminTemplatesService.getAllTemplates()
        ]).pipe(
                map((result: any) => {
                    return {
                        templates: result[0]
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
