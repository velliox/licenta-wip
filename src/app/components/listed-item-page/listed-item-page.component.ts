import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { finalize, map, Observable, pipe, switchMap } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { Messages } from 'src/app/models/messages.model';
import { BidsInfoService } from 'src/app/services/bids-info.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Product } from 'src/app/models/product.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-listed-item-page',
  templateUrl: './listed-item-page.component.html',
  styleUrls: ['./listed-item-page.component.css']
})
export class ListedItemPageComponent implements OnInit {
  msgs: any;
  postId: any;
  hasPhoneNB: any;
  highestPost: any;
  myHighestPostdata: any;
  UserPersInfo: any;
  UserPersInfoData: any;
  result: boolean = false;
  myTestTest: boolean | undefined;

  //result: string = '';

  constructor(private bis: BidsInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private toast: HotToastService,
    private urs: UserManagementService,
    private userInfo: UserInfoService,
    public dialog: MatDialog) { }

  myMsgs:any;
  userID: any;
  canClose: any;
  canPost: any;
  postDetail: any;
  zaPost: any;
  myPostData: any;
  messagesList: any;
  userDisplayName: any;
  loading = false;
  isActuallyClosed: any;

  offerForm = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
  })

  testInfo: any;
  test2 : any;
  ngOnInit(): void {
    //test id= uoOhTTZpeWkSC0b6Cfwp;
    
    this.route.params.subscribe(params=>{
      this.postId = params['itemId'];
    })
    this.msgs= this.bis.loadAllMessages(this.postId).subscribe(res =>{
      this.myMsgs = res
    });
    this.userDisplayName = this.urs.getLoggedUserDisplayName();
    this.getMyProductInfo()
    .then(t =>this.userID = this.urs.getLoggedUserID() )
    .then(r=> this.checkIfOwner())
    .then(t=> this.checkIfClosed())
    .then(y=> this.checkPhoneNB())
    .then(u=> this.checkHighest())
    .then(i=> this.checkifAdminInfo());
    this.userID = this.urs.getLoggedUserID();
    //console.log(this.urs.getLoggedUserID());
  }


  
  async checkPhoneNB(){
    this.hasPhoneNB = await this.userInfo.checkPhoneNumber();
  }

  async checkHighest(){
    this.highestPost= this.bis.loadHighest(this.postId).subscribe(res =>{
      this.myHighestPostdata = res
    });

  }

  async getMyProductInfo(){
    this.zaPost = await this.bis.getProductInfo(this.postId);
    this.myPostData = this.zaPost.data();
    //console.log(this.myPostData);


    this.testInfo= await this.bis.getSpecificUserPosts('v9IuyoyXFpeppiArslfsYYQD2CO2');
    this.test2 = this.testInfo;
    //console.log(this.test2);
  }


  checkIfOwner(){
    if(this.myPostData?.seller_uid == this.userID){
      this.canClose = true;
    }
  }

  async checkifAdminInfo(){
    this.UserPersInfo = await this.userInfo.getUserInfo(this.urs.getLoggedUserID());
    this.UserPersInfoData = this.UserPersInfo.data();
  }
  checkifAdmin(){
    console.log(this.UserPersInfoData?.isAdmin);
  }

  checkIfClosed(){
    if(this.myPostData?.isClosed == true){
      this.canClose = false;
      this.canPost = false;
      this.isActuallyClosed = true;
    }
    else{
      this.canPost = true;
    }
  }



  get value(){
    return this.offerForm.get('value');
  }

  async deleteListing(){
    if(confirm("Warning! Are you sure you want to delete this post? This is irreversible!")) {
      if(this.UserPersInfoData?.isAdmin){
        const resOffer = await this.db.collection('listed_items').doc(this.postId).delete();
        this.toast.success('The product has been deleted');
        this.router.navigate(['/home']);
      }else{
        this.toast.info('Action cancelled.');
      }
    }
  }

  async closeListing(){
    if(confirm("Are you sure you want to close this post?")) {
      if(this.canClose == true){
        console.log(this.canClose);
        const resOffer = await this.db.collection('listed_items').doc(this.postId).update({isClosed : true});
        this.toast.success('The product has been unlisted and the winner is '+ this.myHighestPostdata[0].user_name);
        window.location.reload();
      }
    }
    
    
  }



  async submit(){
    if(confirm("Are you sure you want to bid the value of "+ this.offerForm.value.value + ' RON?' )) {
      const userOffer = parseInt(this.offerForm.value.value);
      const currentOffer = parseInt(this.myHighestPostdata[0].value)

      if(userOffer <= currentOffer){
        this.toast.warning('The submitted value must be higher than the current offer');
      }
      if(this.myPostData.seller_uid == this.userID){
        this.toast.warning('You can not submit an offer to your own product');
      }
      else if(userOffer > currentOffer){
        const resOffer =await this.db.collection('listed_items').doc(this.postId).collection('messages').add({
          user_id: this.userID,
          user_name: this.userDisplayName,
          value: userOffer
        });
        this.toast.success('The offer is valid and has been submitted!');
        this.offerForm.reset();
      }
    }
  }

  // async getItems(){
  //   console.log( await this.bis.getAllBids());
  // }

  // async getUsers() {
  //   console.log(await this.bis.getAllUsers());
  //  }

  //  async getSpecificItemMessages(){
  //    //console.log(await this.bis.getAllBidsMessages("uoOhTTZpeWkSC0b6Cfwp"));
  //    this.myMsgs = await this.bis.getAllBidsMessages("uoOhTTZpeWkSC0b6Cfwp");
  //   //  console.log( await this.bis.getAllBidsMessages("uoOhTTZpeWkSC0b6Cfwp"));
  //  }
  //  async getSpecificItem(){
  //   console.log( await this.bis.getBidsInfo("uoOhTTZpeWkSC0b6Cfwp"));
  // }

  
  // postPseudoData: any= {
  //   "biddings": [
  //     {
  //       "title": "Masina Spalat Arctic",
  //       "bidding_uid": "178rh12hz",
  //       "descriere": "in stare functionala",
  //       "seller_uid": "PQlR0XJYnoC13K4CO8cx",
  //       "listed_bids": [
  //         {
  //           "listed_bids_uid": "kqM9N7Lnj0pKhH80eDBF",
  //           "bidder_uid": "4w43PB5na1JsaOVzIsCi",
  //           "bidder_name": "Sorin",
  //           "bid_value": "54.04",
  //           "timestamp": "6 May 2022 at 14:04:00 UTC+3"
  //         },
  //         {
  //           "listed_bids_uid": "kqM9N7Lnj0pKhH80eDB2",
  //           "bidder_uid": "4w43PB5na1JsaOVzIsCp",
  //           "bidder_name": "Matei",
  //           "bid_value": "58.37",
  //           "timestamp": "6 May 2022 at 14:09:00 UTC+3"
  //         }
  //       ]
  //     }
  //   ]
  // }


}

