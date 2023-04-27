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
  
  role:''
}
  
  userData:any;

  
 
  
  constructor(private router:Router, private bookapp:BookAppService){
    bookapp.getUserinfo().subscribe(x=>{
      this.userData=x;
      console.log(x);
    })
  
  }



  

  formData:any={}

  // registerData:any={};
  
  getData(data:NgForm){
    this.formData=data;
    console.log(this.formData);
    // if((this.username=='') ){
    //   this.usererrormssg="Please enter valid username";
    // }
    // if((this.email=='') ){
    //   this.emailerrormssg="Please enter valid emailId";
    // }
    // if((this.password=='')){
    //   this.passworderrormssg="Please enter valid password";
    // }
    // if((this.role=='')){
    //   this.roleerrormssg="Mention Role";
    // }
    // alert("Success");

    this.bookapp.setMessage(this.formData);

    //checking the signup data with usersinfo api
    let exists = false;
    for(var i=0;i <this.userData.length; i++){
      if(this.userData[i].email== this.formData.email.trim()){
        exists = true;
      }
    }
    if(exists){
      console.log("User already exists");
    }
    else{
      this.bookapp.postUserinfo(this.formData).subscribe(x=>{
        console.log("inserted succesfully")

      })
    }
  }

  ngOnInit():void{
  
  }
  


  // login(data1:any){
  //   this.registerData=data1

  //   if((this.username=='') || (this.password=='')){
  //     this.errormssg="Please enter valid username and password";
  //   }
  // if(this.formData.Username==this.registerData.Username && this.formData.Password==this.registerData.Password){
  //     alert ("login successful")
  //     this.router.navigateByUrl('home')
  //   }
  // }

 
 
  
}
