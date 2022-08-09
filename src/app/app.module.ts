import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { SecretRouteComponent } from './components/secret-route/secret-route.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ListedItemPageComponent } from './components/listed-item-page/listed-item-page.component';
import { PostProductPageComponent } from './components/post-product-page/post-product-page.component';
import { MatInputModule } from '@angular/material/input';
import { HotToastModule } from '@ngneat/hot-toast';
import {MatMenuModule} from '@angular/material/menu';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    SecretRouteComponent,
    LoginComponent,
    RegisterPageComponent,
    ListedItemPageComponent,
    PostProductPageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatMenuModule,
    HotToastModule.forRoot()
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
