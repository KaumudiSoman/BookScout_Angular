import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user-authentication/login/login.component';
import { RegisterComponent } from './components/user-authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ForgotPasswordComponent } from './components/user-authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/user-authentication/verify-email/verify-email.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BookshelfComponent } from './components/bookshelf/bookshelf.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'explore', component: SearchBookComponent},
      {path: 'wishlist', component: WishlistComponent},
      {path: 'bookshelf', component: BookshelfComponent},
      {path: 'book-detail/:id', component: BookDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
