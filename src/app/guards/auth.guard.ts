import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,  } from 'rxjs';
import { take, map } from 'rxjs';
import { UserInfoService } from '../services/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private userInfo: UserInfoService
  ){}

  hasPhone: boolean | undefined;

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const user = await this.afAuth.currentUser;
      const isAuthentificated = user ? true: false;
      this.hasPhone = await this.userInfo.checkPhoneNumber();
      //console.log(this.hasPhone);
      if(!isAuthentificated || this.hasPhone== false){
        alert("You must be logged-in in order to see this page");
        if(this.hasPhone==false){
          this.router.navigate(['/login']);
        }
        return false;
      }
      return isAuthentificated;
  }




  async getUID(){
    return this.afAuth.currentUser;
  }
  
}
