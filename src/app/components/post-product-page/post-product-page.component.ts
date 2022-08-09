import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserManagementService } from 'src/app/services/user-management.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product-page',
  templateUrl: './post-product-page.component.html',
  styleUrls: ['./post-product-page.component.css']
})
export class PostProductPageComponent implements OnInit {

  myFormData: any;
  userID: any;
  initialPrice: any;
  userDisplayName: any;
  productForm = new FormGroup({
    titlu: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descriere: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    pic_url: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    value: new FormControl('', [Validators.required, Validators.max(99999)])
  })

  constructor(private db: AngularFirestore, 
    private urs: UserManagementService,
    private toast: HotToastService,
    private route: Router) {
   }

  ngOnInit(): void {
    this.userID = this.urs.getLoggedUserID();
    this.userDisplayName = this.urs.getLoggedUserDisplayName();
  }

  // pushInfo(form: any){
  //   this.myFormData = form
  //   console.log(form.p_name);
  //   this.pushInfoToDB();
  // }

  // async pushInfoToDB(){
  //   // Add a new document with a generated id.
  //  const res = await this.db.collection('listed_items').add({
  //    descriere: this.myFormData.p_description,
  //    seller_uid: this.userID,
  //    seller_displayName: this.userDisplayName,
  //    titlu: this.myFormData.p_name,
  //    pic_url: this.myFormData.init_pic,
  //    isClosed: false
  //  });


  //  console.log('Added document with ID: ', res.id);

  //  const resMsg = await this.db.collection('listed_items').doc(res.id).collection('messages').add({
  //   user_id: this.userID,
  //   user_name: this.userDisplayName,
  //   value: this.myFormData.init_price
  // });

  // // const resRef = await this.db.collection('listed_items').add({
  // //   messages: this.db.doc('listed_items/messages')
  // // })

  // console.log('Added document cica cu ID: ', resMsg.id);

  // }

  get descriere(){
    return this.productForm.get('descriere');
  }

  get titlu(){
    return this.productForm.get('titlu');
  }
  get pic_url(){
    return this.productForm.get('pic_url');
  }
  get value(){
    return this.productForm.get('value');
  }

  async submit(){
    const{ titlu, descriere, pic_url, value} = this.productForm.value;
    if(confirm("Are you sure you want post this product?" +
    "\ntitle: " +titlu +
    "\ndescription: "+ descriere+
    "\nvalue: " + value + " ")) {
      //const{ titlu, descriere, pic_url, value} = this.productForm.value;
      const res = await this.db.collection('listed_items').add({
        descriere: descriere,
        seller_uid: this.userID,
        seller_displayName: this.userDisplayName,
        titlu: titlu,
        pic_url: pic_url,
        isClosed: false
      })

      this.initialPrice = parseInt(value);
  
      
      //console.log('Added document with ID: ', res.id);

      const resMsg = await this.db.collection('listed_items').doc(res.id).collection('messages').add({
      user_id: this.userID,
      user_name: this.userDisplayName,
      value: this.initialPrice
    });
      if(res != null){
      this.toast.success('Product has been added with success with ID ' + res.id);
      this.route.navigate(['/listed-item/', res.id]);
      }

    }
  }
}
