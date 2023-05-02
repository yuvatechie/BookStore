import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentRoute = state.url
    const currentRole = localStorage.getItem('role');

    if(currentRoute.includes("/admin/") && (currentRole === 'Admin')){
      return true;
    }
    else
    {
      this.router.navigate(['/home']);
      return false;
    }
    console.log(currentRoute,"currentRoute")
      return true;
  }
  
}
