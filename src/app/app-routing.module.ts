import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { BookComponent } from './book/book.component';
import { EditbookComponent } from './editbook/editbook.component';
import { UserBookComponent } from './user-book/user-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { UsersCartsComponent } from './users-carts/users-carts.component';
import { PaymentComponent } from './payments/payment/payment.component';
import { AuthGuard } from './authguard/auth.guard';
import { AuthenticateGuard } from './authenticateGuard/authenticate.guard';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
   {
    path:'register',
    component:SignupComponent 
   },
   {
    path:'admin/order',
    component:OrdersComponent,
    canActivate: [AuthGuard]
   },
   {
    component: BookComponent,
    path: 'admin/books',
    canActivate: [AuthGuard]
  },
  {
    component: EditbookComponent,
    path: 'books/:id/edit',
    canActivate: [AuthGuard]
  },
  {
    component: UserBookComponent,
    path: 'home',
    canActivate:[AuthenticateGuard]
  },
  {
    component: ViewBookComponent,
    path: 'view/:id/books',
    canActivate:[AuthenticateGuard]
  },
  {
    component: UsersCartsComponent,
    path: 'carts',
    canActivate:[AuthenticateGuard]
  },
  {
    component: PaymentComponent,
    path: 'payments',
    canActivate:[AuthenticateGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
