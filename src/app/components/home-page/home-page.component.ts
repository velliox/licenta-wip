import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BidsInfoService } from 'src/app/services/bids-info.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  // Pagination parameters.
  p=1;
  count= 5;
  myPosts: any;
  posts: any;
  constructor(private bis: BidsInfoService,
    private db: AngularFirestore) { 
 
  }


  ngOnInit(): void {
    this.posts= this.bis.loadAllPosts().subscribe(res =>{
      this.myPosts = res
    });
  }







}
