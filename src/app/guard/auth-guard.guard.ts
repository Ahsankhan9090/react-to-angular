import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private dataService: DataService
  ) {
    // Nothing
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const loggedIn = localStorage.getItem('token');
    if (!loggedIn) {
        this.router.navigate(['/sign-in']).catch((_error) => undefined);
        return false;
      }

    return true;

  }

}
