import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
                private toastr: ToastrService,
                private authService: AuthService,
                private router: Router
            ) {}

            canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
                // check if user is logged in
                return this.authService.verify().pipe(
                    map(user => {
                        if (user) return true;
                    }),
                    catchError(error => {
                        this.toastr.error(error.message.error);
                        this.router.navigate(['/login']);
                        return of(false);
                    })
                );

            }
}