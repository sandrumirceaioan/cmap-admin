import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { of, Observable, forkJoin } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { AdminCasinosService } from '../admin-casinos/admin-casinos.service';
import { AdminBonusesService } from '../admin-bonuses/admin-bonuses.service';
import { AdminSlotsService } from '../admin-slots/admin-slots.service';
import { AdminAffiliatesService } from '../admin-affiliates/admin-affiliates.service';


@Injectable()
export class AdminDashboardResolve implements Resolve<any> {

    constructor(
        private adminCasinosService: AdminCasinosService,
        private adminBonusesService: AdminBonusesService,
        private adminSlotsService: AdminSlotsService,
        private adminAffiliatesService: AdminAffiliatesService,
        private toastr: ToastrService,
        private router: Router
        ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let lastRoute = this.router.url;

        return forkJoin([
            this.adminCasinosService.countCasinos(),
            this.adminBonusesService.countBonuses(),
            this.adminSlotsService.countSlots(),
            this.adminAffiliatesService.countAffiliates(),
            this.adminCasinosService.countByReputation()
        ]).pipe(
                map((result) => {
                    return {
                        casinos: result[0],
                        bonuses: result[1],
                        slots: result[2],
                        affiliates: result[3],
                        reputation: result[4]
                    };
                }),
                catchError((error) => {
                    this.toastr.error(error.message);
                    this.router.navigate([lastRoute]);
                    return of(null);
                })
            );

    }



}