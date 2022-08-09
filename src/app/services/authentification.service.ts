import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private auth: Auth) { }


  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  
  logout(){
    return from(this.auth.signOut());
  }

  signUp(display_name: string, email: string, password: string, phoneNumber: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(
      switchMap(({ user })=> updateProfile(user, { displayName: display_name}))
    )
  }


}
