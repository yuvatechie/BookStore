import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BookAppService } from 'src/app/book-app.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {

  UserID = localStorage.getItem('id');
  UserEmail = localStorage.getItem('email');
  Name = localStorage.getItem('name');
  Role = localStorage.getItem('role');
  Data:any;
  cartItems:any;
  count:number=0;

  constructor(private http: BookAppService, private router:Router){

    this.http.getOrderByUserId(this.UserID).subscribe((OrderById)=>{
      this.Data = OrderById;
      console.log(this.Data)
    });

    this.http.getCartByUserId(this.UserID).subscribe((cart)=>{
      this.cartItems = cart;
      console.log(cart);
      for(var i=0; i<this.cartItems.length; i++){
          this.count = this.cartItems.length;
      }
    })
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate([''])
  }


}
