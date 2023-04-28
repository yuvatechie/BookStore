import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookAppService } from '../book-app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  form ={
  username :'',
  email:'',
  password:''
}
 
  loginErrorMssg :string='';
  

  signinData:any;

  userData:any;
  constructor(private router:Router, private bookapp:BookAppService){
    bookapp.getUserinfo().subscribe(x=>{
      this.userData=x;
      console.log(x);
    })
  }

  ngOnInit():void{
    this.signinData = this.bookapp.getMessage()
  }

  


  loginData:any={};



  
  // getData(data:NgForm){
  //   this.formData=data;
  //   console.log(this.formData);
  //   if((this.username=='') || (this.password=='')){
  //     this.errormssg="Please enter valid username and password";
  //   }
  //   alert("Success");
  // }
  

  login(){
    const bodydata={
      Email:this.form.email,
      Name:this.form.username,
      Password:this.form.password,
     
    }
    // console.log(this.signinData)

    // if((this.username=='')){
    //   this.Usererrormssg="Please enter valid username";
    // }
    // if((this.password=='')){
    //   this.Passworerrormssg="Please enter valid password";
    // }
  //  else  if(this.signinData.Username==this.registerData.Username && this.signinData.Password==this.registerData.Password){
  //     alert ("login successful");
  //     this.router.navigateByUrl('home');
  //   }
    let count =0;
    for(var i=0; i<this.userData.length;i++ ){
      if( this.userData[i].email==bodydata.Email  && this.userData[i].password==bodydata.Password.trim()){
        alert ("login successful");
        this.router.navigateByUrl('home');
        count++;
      }
    }
    if(count==0){
      this.loginErrorMssg="Inavlid Username and Password";
    }


  }


 

  
}

    