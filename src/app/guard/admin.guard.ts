import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  /**
   *
   */
  constructor(private jwtHelper:JwtHelperService, private router:Router) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.isUserAdmin()){
      return true;
    }

    this.router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url }});
    return false;
  }




  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("jwt");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
   for(var a in roles){

    if ( roles[a]==='SuperAdmin' || roles[a]==='Admin' ){
       var data=true;
    }
  }
  return data;
  }

}
