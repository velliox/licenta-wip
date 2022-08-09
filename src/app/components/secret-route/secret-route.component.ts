import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BidsInfoService } from 'src/app/services/bids-info.service';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-secret-route',
  templateUrl: './secret-route.component.html',
  styleUrls: ['./secret-route.component.css']
})
export class SecretRouteComponent implements OnInit {
  myUserID: any;
  UserID: any;
  myData: any;
  data: any;
  isOwner = false;
  isVisible= false;
  newProfilePic : any;
  p=1;
  count= 2;
  myPosts: any;
  posts: any;

  imageForm = new FormGroup({
    imageLink: new FormControl('')
  })

  constructor(private bis: BidsInfoService, 
    private route: ActivatedRoute, 
    private db: AngularFirestore, 
    private urs: UserManagementService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.UserID = params['UserId'];
    })

    this.posts= this.bis.loadUserPosts(this.UserID).subscribe(res =>{
      console.log(res);
      this.myPosts = res
    });
    //this.myUserID = this.urs.getLoggedUserID();
    this.initializeUserInfo()
    .then(r=> this.checkIfOwner());
    //this.checkIfOwner();
    this.getMyUserInfo();
    
    
  }

  async initializeUserInfo(){
    this.myUserID = await this.urs.getLoggedUserID();
  }

  enableVisibility(){
    this.isVisible = true;
  }

  async getMyUserInfo(){
    this.data = await this.urs.getUserInformation(this.UserID);
    this.myData = this.data.data();
    //console.log(this.myPostData);
    //console.log(this.test2);
  }

  checkIfOwner(){
    if(this.myUserID == this.UserID){
      this.isOwner = true;
    }
  }

  async submit(){
    this.newProfilePic = this.imageForm.value.imageLink;
    if(this.isOwner == true){
      console.log(this.isOwner);
      const resOffer = await this.db.collection('users').doc(this.UserID).update({profilePicture : this.newProfilePic});
      window.location.reload();
    }
    this.isVisible= false;
  }
    

}
