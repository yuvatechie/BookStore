import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppService } from '../book-app.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent {

  //Adding FormGroup
    editBook: FormGroup;
    id: number;
    UserId = localStorage.getItem('id');
    UserEmail = localStorage.getItem('email');
    Name = localStorage.getItem('name');
    Role = localStorage.getItem('role');


  constructor(private bookservice: BookAppService, 
             private router: Router, 
             private formBuilder: FormBuilder, 
             private route: ActivatedRoute ){

     this.editBook = this.formBuilder.group({
      id:'',
      name: '',
      author: '',
      publisher: '',
      price: '',
      publishDate: ''
     })

    this.id = this.route.snapshot.params['id'];
 
    this.bookservice.getBookByID(this.id).subscribe(
     (book)=> this.editBook.patchValue(book)
     )
    console.log(this.id)
  }

  // submit(){
  //   this.bookservice.updateByID(this.route.snapshot.params['id'], this.editBook.value).subscribe(()=>{
  //   this.router.navigate(['/admin/books']);
  //      })
  //   console.log(this.editBook.value);
  //   }

  back(){
      this.router.navigate(['/admin/books']);
    }

    logout()
    {
      localStorage.clear();
      this.router.navigate(['']);
    }

}

