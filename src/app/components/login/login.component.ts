import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormGroup, NgForm, SelectControlValueAccessor, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserManagementService } from 'src/app/services/user-management.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { from, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  userDetails: any;
  userInformation: any;
  userID: any;
  userAllInfo: any;
  hasPhoneNB = true;



  registerForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10}')])
  })

  constructor(public afAuth: AngularFireAuth,
    private auth: Auth,
    private router: Router,
    private authService: AuthentificationService,
    private toast: HotToastService,
    private usr: UserManagementService,
    public userInfo: UserInfoService,
    private db: AngularFirestore){}
  title = 'bid-warz';
  signIn(){

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    
    this.afAuth.setPersistence('local');
    this.afAuth.signInWithPopup(googleAuthProvider).then(r => this.checkPhoneNB());
    // console.log('1');
    //this.userInfo.getUserInfo('WwiBhjJ3MUTVgVpLfVkGWCBGAAD2');
  }

  googleLogin(){
    this.signIn();
    firebase.auth().onAuthStateChanged(function(user){
      if(user){

      }
      else{

      }
    })

  }

  async checkPhoneNB(){
    this.hasPhoneNB = await this.userInfo.checkPhoneNumber();
    
  }

  get phoneNumber(){
    return this.registerForm.get('phoneNumber');
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  signOut(){
    this.afAuth.signOut();
    this.hasPhoneNB = true;
  }

  submitPN(){
    console.log(this.usr.getLoggedUserID());
    const displayName = this.auth.currentUser?.displayName;
    const phoneNumber = this.registerForm.value.phoneNumber;
    //console.log(displayName, phoneNumber);
    const resMsg =  this.db.collection('users').doc(this.usr.getLoggedUserID()).set({
      displayName: displayName,
      phoneNumber: phoneNumber,
      isAdmin: false,
      profilePicture: 'https://i.imgur.com/sItvOkw.png'
    });
    this.toast.success("Congratulations! You  are now fully logged in!");
    this.router.navigate(['/home']);

  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }

    const{ email, password} = this.loginForm.value;
    console.log('salut gogou');
    this.authService.login(email, password)
    .pipe(this.toast.observe({
      success: 'Logged in successfuly',
      loading: 'Logging ...',
      error: 'Something went wrong!'
    }))
    .subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }



}
