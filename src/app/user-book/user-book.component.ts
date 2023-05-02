import { Component, OnInit } from '@angular/core';
import { BookAppService } from '../book-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css']
})
export class UserBookComponent implements OnInit {

  i:number = 0;
  list:any;
  showBook:any;
  cartItems:any;
  count:number = 0;
  UserId = localStorage.getItem('id');
  UserEmail = localStorage.getItem('email');
  Name = localStorage.getItem('name');
  Role = localStorage.getItem('role');

  //Form data variable
  cart = {
    bookID: '',
    date: '',
    qty: ''
  }

  constructor(private bookService:BookAppService, private route:Router){} 

  ngOnInit(){
    this.bookService.booklist().subscribe((book)=>{
      this.list = book;
    });

    this.bookService.getCartByUserId(this.UserId).subscribe((cart)=>{
      this.cartItems = cart;
      for(var i=0; i<this.cartItems.length; i++){
          this.count = this.cartItems.length;
      }
    })
  }

  view(viewBook:any){
    this.showBook=viewBook;
  }

  logout()
  {
    localStorage.clear();
    this.route.navigate([''])
  }
}
