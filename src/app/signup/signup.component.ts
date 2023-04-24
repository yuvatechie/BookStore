import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(private router:Router){}

  ngOnInit():void{}

  formData:any={}

  registerData:any={};
  
  getData(data:NgForm){
    this.formData=data
    alert("Success")
  }
  

  login(data1:any){
    this.registerData=data1
  if(this.formData.Username==this.registerData.Username && this.formData.Password==this.registerData.Password){
      alert ("login successful")
      this.router.navigateByUrl('home')
    }
  }
}
