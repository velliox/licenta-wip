import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserManagementService } from 'src/app/services/user-management.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{10}')])
  })

  constructor(private authService: AuthentificationService,
    private toast: HotToastService,
    private router: Router,
    private db: AngularFirestore,
    private usr: UserManagementService) { }

  ngOnInit(): void {
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phoneNumber(){
    return this.registerForm.get('phoneNumber');
  }

  submit(){
    if(!this.registerForm.valid){
      return;
    }

    const{displayName, email, password, phoneNumber} = this.registerForm.value;
    this.authService.signUp(displayName, email, password, phoneNumber).pipe(
      this.toast.observe({
      success: 'Congratulations! You are now registered',
      loading: 'Signing in',
      error: ({message}) => `${message}`
      })
    ).subscribe(async ()=>{
      const resMsg = await this.db.collection('users').doc(this.usr.getLoggedUserID()).set({
        displayName: displayName,
        phoneNumber: phoneNumber,
        isAdmin: false,
        profilePicture: "https://i.imgur.com/sItvOkw.png"
      });
      this.router.navigate(['/home'])
    })
  }

}
