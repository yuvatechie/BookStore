import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookAppService } from '../book-app.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
form={
  username :'',
  email:'',
  password:'',
  role:'user'
}
  
  userData:any;
  error="";
  constructor(private router:Router, private bookapp:BookAppService){
    bookapp.getUserinfo().subscribe(x=>{
      this.userData=x;
      console.log(x);
    })
  
  }

  
  
  getData(){
    
    const bodydata={
      Email:this.form.email,
      Name:this.form.username,
      Password:this.form.password,
      Role:this.form.role
    }
   
    

    // this.bookapp.setMessage(this.formData);

    //checking the signup data with usersinfo api
    let exists = false;
     for(var i=0;i <this.userData.length; i++){
       if(this.userData[i].email== bodydata.Email.trim()){
         exists = true;
       }
     }
    if(exists){
      console.log("User already exists");
    }
    else{
      
      
      this.bookapp.postUserinfo(bodydata).subscribe(x=>{
        console.log("inserted succesfully")
        if(bodydata.Email == '' && bodydata.Name == '' && bodydata.Password == '' )
        {
          this.error ="Please fill all details"
          console.log(this.error)
          this.router.navigateByUrl('register');
        }
        else
        {
          this.router.navigateByUrl('');
        }
        
      })
    }
  }

  ngOnInit():void{
  
  }

 
 
  
}
