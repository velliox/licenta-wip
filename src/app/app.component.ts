import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth, PERSISTENCE } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserManagementService } from './services/user-management.service';
import { AuthentificationService } from './services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public afAuth: AngularFireAuth, 
    private authService: AuthentificationService,
    private router: Router,
    private urs: UserManagementService){}
  title = 'bid-warz';
  // signIn(){
  //   const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  //   this.afAuth.signInWithPopup(googleAuthProvider);
  //   this.afAuth.setPersistence("none");
  // }

  
  goToMyAccount(){
    this.router.navigate(['/account/'+this.urs.getLoggedUserID()]);
  }

  signOut(){
    this.afAuth.signOut();
    window.location.reload();
  }


}
