import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListedItemPageComponent } from './components/listed-item-page/listed-item-page.component';
import { LoginComponent } from './components/login/login.component';
import { PostProductPageComponent } from './components/post-product-page/post-product-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SecretRouteComponent } from './components/secret-route/secret-route.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'about', component: AboutPageComponent, canActivate: [AuthGuard]},
  {path: 'listed-item/:itemId', component: ListedItemPageComponent},
  {path: 'account/:UserId', component: SecretRouteComponent},
  {path: 'post-product', component: PostProductPageComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
