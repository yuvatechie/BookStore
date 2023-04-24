import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// export class LoginComponent implements OnInit{

//   constructor(){ }
//   ngOnInit(): void {
//     const signUpButton = document.getElementById('signUp');
//     const signInButton = document.getElementById('signIn');
//     const container = document.getElementById('container');
    
//   }
// }
export class LoginComponent{
   signUpButton = document.getElementById('signUp');
     signInButton = document.getElementById('signIn');
     container = document.getElementById('container');
    

  constructor(){ 
    this.signUpButton?.addEventListener('click',() => {
      this.container?.classList.add('right-panel-active');
    });
    this.signInButton?.addEventListener('click',() => {
      this.container?.classList.add('right-panel-active');
    });

  }
}

    