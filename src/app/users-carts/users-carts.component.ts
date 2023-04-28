import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookAppService } from '../book-app.service';

@Component({
  selector: 'app-users-carts',
  templateUrl: './users-carts.component.html',
  styleUrls: ['./users-carts.component.css']
})
export class UsersCartsComponent {
  
  cartItems:any;
  i:number=0;
  sum:number=0;

  constructor(private http: BookAppService, private router: Router){
    this.http.getCart().subscribe((cart)=>{
      this.cartItems = cart;
      for(var i=0; i<this.cartItems.length; i++){
        this.sum = this.cartItems[i].bookPrice + this.sum;
        console.log(this.sum)
      }
    }) 
  }

  cartDelete(id:number){
    this.http.deleteCartByID(id).subscribe(()=>{
      window.location.reload();
    })
  }
}
