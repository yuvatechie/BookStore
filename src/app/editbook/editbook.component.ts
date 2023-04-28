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
      date: ''

     })

    this.id = this.route.snapshot.params['id'];
 
    this.bookservice.getBookByID(this.id).subscribe(
     (book)=> this.editBook.patchValue(book)
     )
    console.log(this.id)
  }

  submit(){
    this.bookservice.updateByID(this.route.snapshot.params['id'], this.editBook.value).subscribe(()=>{
    this.router.navigate(['/books']);
       })
    console.log(this.editBook.value);
    }

  back(){
      this.router.navigate(['/books']);
    }

  
}

