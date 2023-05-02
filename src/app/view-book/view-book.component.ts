import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppService } from '../book-app.service';
@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {

  book:any;
  id:number;
  i:number=0;
  totalPrice:number=0;
  UserId = localStorage.getItem('id');
  UserEmail = localStorage.getItem('email');
  Name = localStorage.getItem('name');
  Role = localStorage.getItem('role');
  cartItems:any;
  count:number=0;

  viewForm = {
    qty : this.i,
    bookId : '',
  }

  constructor(private http:BookAppService, private route:ActivatedRoute, private router: Router){
    this.id = this.route.snapshot.params['id'];
    this.http.getBookByID(this.id).subscribe((data)=>{
      this.book = data;
    })

    this.http.getCartByUserId(this.UserId).subscribe((cart)=>{
      this.cartItems = cart;
      for(var i=0; i<this.cartItems.length; i++){
          this.count = this.cartItems.length;
      }
    })
  }

  plus(){
     this.i++;
     this.totalPrice = this.book.price * this.i
  }

  minus(){
    if(this.i >= 1){
      this.i--;
      this.totalPrice = this.totalPrice - this.book.price
    }
  }

  addToCart(){

    this.id = this.route.snapshot.params['id'];
    let userId = localStorage.getItem('id');

    const bodyData = {
      UserId : Number(userId),
      BookId : Number(this.id),
      Quantity : this.i,
      BookPrice : this.totalPrice
    };

    if(bodyData.Quantity == 0){
       alert("Please Add Quantity");
    }
    else{
      this.http.addCart(bodyData).subscribe(()=>{
        alert("Added to cart Successfully!")
        this.router.navigate(['/users_books'])
      });
      console.log(bodyData)
    }
   
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['']);
  }
  // cart(id:number){
  //   console.log(id)
  // }
}
