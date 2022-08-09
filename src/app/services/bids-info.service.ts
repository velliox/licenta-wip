import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Bidding } from '../models/bidding.model';
import { Messages } from '../models/messages.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class BidsInfoService{

  constructor(private db: AngularFirestore) { }

  getAllBids() { // this to be solely used to get all the items
    return new Promise<any>((resolve)=> {
    this.db.collection('listed_items').valueChanges({ idField: 'id' }).subscribe(items => resolve(items));
    })
   }
  
  getBidsInfo(bid_id: string) { //this pulls everything at specific id defined inside valueChanges
    return new Promise<any>((resolve)=> {
      this.db.collection('listed_items').valueChanges({ id: bid_id }).subscribe(items => resolve(items));
      })
   }


   async getProductInfoBB(bid_id: string){ //bun asta merge
    return new Promise<any>((resolve)=> {
      this.db.collection('listed_items').doc(bid_id).get().subscribe(items => resolve(items));
      })
   }

   async getProductInfo(bid_id: string){ //bun asta merge
    return new Promise<any>((resolve)=> {
      this.db.collection('listed_items').doc(bid_id).get().subscribe(items => resolve(items));
      })
   }

  
  getAllBidsMessages(bid_id: string) { //this technicalyl works but not dynamically but i leave it be just incase
    return new Promise<any>((resolve)=> {
    this.db.collection('listed_items/'+bid_id+'/messages').valueChanges({ idField: 'id' }).subscribe(items => resolve(items));
    })
   }

   getAllUsers() { //does what it says, gets all users...
    return new Promise<any>((resolve)=> {
    this.db.collection('User').valueChanges({ idField: 'id' }).subscribe(users => resolve(users));
    })
   }


  async getSpecificUserPosts(my_id: string){
    return new Promise<any>((resolve)=> {
    this.db.collection("listed_items", ref=> ref.where('seller_uid', '==', my_id)).valueChanges().subscribe(items => resolve(items));
    })
  }

  async getSpecificUserPosts2(my_id: string){
    return this.db.collection("listed_items", ref=> ref.where('seller_uid', '==', my_id)).get();
  }
  // this brings all messages, really good, maps them aswell
   loadAllMessages(bid_id: string): Observable<Messages[]>{
    return this.db.collection('listed_items/'+bid_id+'/messages', ref=> ref.orderBy('value', 'asc'))
    .snapshotChanges()
    .pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Messages>{
          ids: snap.payload.doc.id,
          ...snap.payload.doc.data() as Messages
        };
      });
    }));

   }

   loadHighest(bid_id: string): Observable<Messages[]>{
    return this.db.collection('listed_items/'+bid_id+'/messages', ref=> ref.orderBy('value', 'desc').limit(1))
    .snapshotChanges()
    .pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Messages>{
          ids: snap.payload.doc.id,
          ...snap.payload.doc.data() as Messages
        };
      });
    }));

   }


   async getAllProducts(){
    const citiesRef = await this.db.collection('listed_items', ref=> ref.where('isClosed', '==', 'false')).get();
    const snapshot = citiesRef;
    snapshot.forEach(doc =>{
      console.log(doc);
    })
    return citiesRef;
  }

  loadAllPosts(): Observable<Product[]>{
    return this.db.collection('listed_items', ref=> ref.where('isClosed', '==', false))
    .snapshotChanges()
    .pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Product>{
          ids: snap.payload.doc.id,
          ...snap.payload.doc.data() as Product
        };
      });
    }));
   }

   loadUserPosts(user_id : string): Observable<Product[]>{
    return this.db.collection('listed_items', ref=> ref.where('seller_uid', '==', user_id))
    .snapshotChanges()
    .pipe(map(snaps=>{
      return snaps.map(snap=>{
        return <Product>{
          ids: snap.payload.doc.id,
          ...snap.payload.doc.data() as Product
        };
      });
    }));
   }
   


}