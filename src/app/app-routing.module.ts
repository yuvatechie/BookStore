import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { BookComponent } from './book/book.component';
import { EditbookComponent } from './editbook/editbook.component';
import { UserBookComponent } from './user-book/user-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { UsersCartsComponent } from './users-carts/users-carts.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
   {path:'register',component:SignupComponent },
   {path:'home',component:HomeComponent},
   {path:'order',component:OrdersComponent},
   {
    component: BookComponent,
    path: 'books'
  },
  {
    component: EditbookComponent,
    path: 'books/:id/edit'
  },
  {
    component: UserBookComponent,
    path: 'users_books'
  },
  {
    component: ViewBookComponent,
    path: 'view/:id/books' 
  },
  {
    component: UsersCartsComponent,
    path: 'carts' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
