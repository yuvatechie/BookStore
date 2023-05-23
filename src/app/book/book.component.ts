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
  UserId = localStorage.getItem('id');
  UserEmail = localStorage.getItem('email');
  Name = localStorage.getItem('name');
  Role = localStorage.getItem('role');
  
  //Book List Variable
  bookList:any;


  //Form Data Variable
  form = {
  name : '',
  author : '',
  publisher : '',
  price : '',
  date : '',
  link:''
  }

  constructor(private book: BookAppService, private router: Router, private route: ActivatedRoute ){
   
  }

  ngOnInit():void{
    let userId = localStorage.getItem('id');
    console.log(userId)
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
      PublishDate : this.form.date,
      BookLink : this.form.link
    };

      this.book.createBook(bodyData).subscribe(()=>{
      this.book.booklist().subscribe((allBook)=>{
        
        this.bookList = allBook;
        
      })
    })
  
  }


   delete(id:number){
    if(confirm("Are you sure you want to delete?"))
    {
      this.book.deleteBookByID(id).subscribe(()=>{
        this.book.booklist().subscribe((allBook)=>{
          this.bookList = allBook;
        })
      });
    }
   }

   logout()
   {
     localStorage.clear();
     this.router.navigate(['']);
   }
 
}
