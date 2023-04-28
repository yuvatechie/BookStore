import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppService } from '../book-app.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  title = 'Book List';

  //Book List Variable
  bookList:any;

  //Adding FormGroup
  // id: number;

  //Form Data Variable
  form = {
  name : '',
  author : '',
  publisher : '',
  price : '',
  date : ''
  }

  constructor(private book: BookAppService, private router: Router, private route: ActivatedRoute ){
   
  }

  ngOnInit():void{
    this.book.booklist().subscribe((allBook)=>{
      this.bookList = allBook;
    })
  }

  addBook(){

    const bodyData = {
      Name : this.form.name,
      Author : this.form.author,
      Publisher : this.form.publisher,
      Price : this.form.price,
      PublishDate : this.form.date
    };

    this.book.createBook(bodyData).subscribe(()=>{
      alert("Book Added Successfully"!);
      window.location.reload();
    })
  }


   delete(id:number){
    if(confirm("Are you sure you want to delete?"))
    {
      this.book.deleteBookByID(id).subscribe(()=>{
        window.location.reload();
      });
    }
   }
 
}
