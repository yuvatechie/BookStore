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
  book_rate:any;
  UserId = localStorage.getItem('id');
  UserEmail = localStorage.getItem('email');
  Name = localStorage.getItem('name');
  Role = localStorage.getItem('role');
  book:any;
  count:number=0;

  constructor(private http: BookAppService, private router: Router){
    this.http.getCartByUserId(this.UserId).subscribe((cart)=>{
      this.cartItems = cart;
      console.log(cart);
      for(var i=0; i<this.cartItems.length; i++){
          this.sum = this.cartItems[i].bookPrice + this.sum;
          this.count = this.cartItems.length;
      }
    }) 
  }

  ngOnInit(){
    
  }

  // cartDelete(id:number){
  //   this.http.deleteCartByID(id).subscribe(()=>{
  //     this.http.getCart().subscribe((cart)=>{
  //       this.sum = this.sum - this.book_rate.bookPrice;
  //     }) 
  //   })
  //   this.http.getCartById(id).subscribe((c)=>{this.book_rate = c})
  // }

  logout()
  {
    localStorage.clear();
    this.router.navigate([''])
  }

}
