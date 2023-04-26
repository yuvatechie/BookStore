import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookAppService {

  authenticationMssg :any
  setMessage(data:any){
    this.authenticationMssg= data;
  }

  getMessage(){
    return this.authenticationMssg;
  }

//   private OrderUrl = "https://catfact.ninja/fact";
  constructor(private httpClient: HttpClient) { }

//   getCatFactData(){
//     return this.httpClient.get(this.OrderUrl)
// }

private UserinfoUrl ="https://localhost:7000/api/Usersinfoes";

getUserinfo(){
  return this.httpClient.get(this.UserinfoUrl);
}

private UsersinfoPostUrl = "https://localhost:7000/api/Usersinfoes";
postUserinfo(user:any){
  return this.httpClient.post(this.UsersinfoPostUrl,user);
}
 private url='https://localhost:7000/api/Orders';
 OrderApi(){ 
  return this.httpClient.get(this.url)
 }

}
