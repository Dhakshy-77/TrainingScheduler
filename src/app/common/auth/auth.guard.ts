import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }
//Return an observable of boolean that can tell whether can activate or not.  
//If not authenticated return route to login page.

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const isAuthenticated = this.authService.isAuthenticated();
        if (!isAuthenticated) {
            this.router.navigate(['login']);
        }
        return of(isAuthenticated);
    }

}
