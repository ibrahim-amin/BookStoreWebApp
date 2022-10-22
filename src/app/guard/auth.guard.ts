import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private jwtHelper: JwtHelperService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");
    if (this.isUserAuthenticated()) {
      return true;
    }
    this.router.navigate(["login"],{ queryParams: { returnUrl: state.url }});
    return false;
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    return token && !this.jwtHelper.isTokenExpired(token);
  }


}
