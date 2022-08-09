import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  theUID:any;
  auth = getAuth();
  theDisplayName: any;
  idDisplayName: any;

  constructor(private db: AngularFirestore) { }

  getLoggedUserID(){
    this.theUID=this.auth.currentUser?.uid;
    return this.theUID;
  }

  getLoggedUser(){
    return this.auth.currentUser;
  }

  getLoggedUserDisplayName(){
    this.theDisplayName=this.auth.currentUser?.displayName;
    return this.theDisplayName;
  }

  getLoggedUserDisplayWithID(my_id: string){
    // to be continued
    // gotta add register with user and password
  }

  async getUserInformation(user_id: string){ //bun asta merge
    console.log(user_id);
    return new Promise<any>((resolve)=> {
      this.db.collection('users').doc(user_id).get().subscribe(items => resolve(items));
      })
   }



}
