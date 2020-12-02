import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthProcessService } from '../services/auth-sync.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _authService: AuthProcessService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._authService.afa.user.pipe(
      map((user) => {
        debugger;
        if (user) {
          if (!user.emailVerified) {
            this.router.navigate([`main/auth/login`]);
            return false;
          }
          return true;
        } else {
          this.router.navigate([`main/auth/login`]);
          return false;
        }
      })
    );
  }
}
