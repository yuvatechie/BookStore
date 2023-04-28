import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookComponent } from './book/book.component';
import { EditbookComponent } from './editbook/editbook.component';
import { UserBookComponent } from './user-book/user-book.component';
import { UsersCartsComponent } from './users-carts/users-carts.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    SignupComponent,
    HomeComponent,
    BookComponent,
    EditbookComponent,
    UserBookComponent,
    UsersCartsComponent,
    ViewBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
