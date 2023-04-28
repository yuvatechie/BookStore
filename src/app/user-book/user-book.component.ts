import { Component, OnInit } from '@angular/core';
import { BookAppService } from '../book-app.service';

@Component({
  selector: 'app-user-book',
  templateUrl: './user-book.component.html',
  styleUrls: ['./user-book.component.css']
})
export class UserBookComponent implements OnInit {

  i:number = 0;
  list:any;
  showBook:any;

  //Form data variable
  cart = {
    bookID: '',
    date: '',
    qty: ''
  }

  constructor(private bookService:BookAppService){} 

  ngOnInit(){
    this.bookService.booklist().subscribe((book)=>{
      this.list = book;
    })
  }

  addCart(data:any){
   alert("Added To Cart Successfully!");
  }

  view(viewBook:any){
    this.showBook=viewBook;
  }
}
