import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookAppService } from '../book-app.service';
import { AuthResponse } from '../auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  form = {
  username :'',
  email:'',
  password:'',
  token:''
}
 
  loginErrorMssg :string='';
  loginData:any={};
  signinData:any;
  userData:any={};

  constructor(private router:Router, private bookapp:BookAppService){
    this.bookapp.getUserinfo().subscribe((x)=>{
      this.userData=x;
    })
  }

  ngOnInit():void{
    this.signinData = this.bookapp.getMessage()
    console.log(this.userData)
  } 

  login(){
    const bodydata={
      Email:this.form.email,
      Name:this.form.username,
      Password:this.form.password,
      Token:this.form.token
     
    }
   
    let count =0;
    for(var i=0; i<this.userData.length;i++ ){
      if(this.userData[i].email==bodydata.Email  && this.userData[i].password==bodydata.Password.trim()){
        
       if(bodydata.Email == 'janedoe@example.com'){
          this.router.navigate(['/admin/books']);
        }
        else if(bodydata.Email != '' && bodydata.Password != '')
        {
          this.router.navigateByUrl('home');
        }
        count++;
      }
    }
    if(count==0){
      this.loginErrorMssg="Inavlid Username and Password";
    }

    //for generating Token
    if (count > 0) {
      this.bookapp.getAuthinfo(bodydata).subscribe(
        (res) => {
          const data = {
            token: res.token,
            id: res.id,
            role: res.role,
            email: res.email,
            name: res.name
          }
          this.bookapp.storeToken(data);
          console.log(res);
          
        }
      );
    }

    
      
  

  }


 

  
}

    