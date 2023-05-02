import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { EditbookComponent } from './editbook/editbook.component';
import { UserBookComponent } from './user-book/user-book.component';
import { UsersCartsComponent } from './users-carts/users-carts.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentComponent } from './payments/payment/payment.component';
import { TokenInterceptor } from './token.interceptor';
import { UserOrderComponent } from './userOrder/user-order/user-order.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    SignupComponent,
    BookComponent,
    EditbookComponent,
    UserBookComponent,
    UsersCartsComponent,
    ViewBookComponent,
    PaymentComponent,
    UserOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [{
          provide:HTTP_INTERCEPTORS,
          useClass:TokenInterceptor,
          multi:true
        }],
  bootstrap: [AppComponent]
})
export class AppModule { }
