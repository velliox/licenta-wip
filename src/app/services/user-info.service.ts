import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserManagementService } from './user-management.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userID: any;
  userInformation: any;
  userAllInfo: any;
  myReply: any;

  async checkPhoneNumber(): Promise<boolean> {
    this.userID = this.usr.getLoggedUserID()
    this.userInformation = await this.getUserInfo(this.userID);
    this.userAllInfo = this.userInformation.data();
    if(this.userAllInfo?.phoneNumber == null){
      //console.log('phone number not found');
      this.myReply = false;
    }
    else if(this.userAllInfo.phoneNumber){
      //console.log('phone number found');
      this.myReply = true;
    }
    return this.myReply;
  }

  constructor(private db: AngularFirestore,
    private usr: UserManagementService) { }


  async getUserInfo(user_id: string){ //bun asta merge
    return new Promise<any>((resolve)=> {
      this.db.collection('users').doc(user_id).get().subscribe(items => resolve(items));
      })
   }
   


}
