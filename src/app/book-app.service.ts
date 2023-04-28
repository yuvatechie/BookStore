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

private UserinfoUrl ="https://localhost:7163/api/Usersinfoes";

getUserinfo(){
  return this.httpClient.get(this.UserinfoUrl);
}

private UsersinfoPostUrl = "https://localhost:7163/api/Usersinfoes";
postUserinfo(user:any){
  return this.httpClient.post(this.UsersinfoPostUrl,user);
}

//authentication based token
// userAuthentication(username,password){

// }


 private url='https://localhost:7163/api/Orders';
 OrderApi(){ 
  return this.httpClient.get(this.url)
 }

 //book crud and cart part

 book_url = "https://localhost:7236/api/Books";
cart_url="https://localhost:7236/api/Carts";

  booklist(){
    return this.httpClient.get(this.book_url);
  }

  createBook(data:any){
    return this.httpClient.post(this.book_url,data);
  }

  getBookByID(id:number){
    return this.httpClient.get(this.book_url + '/'+ id);
  }

  updateByID(id:number, data:any){
    return this.httpClient.put(`${this.book_url}/${id}`, data);
  }

  deleteBookByID(id:number){
    return this.httpClient.delete(this.book_url + '/' + id);
  }

  addCart(data:any){
    return this.httpClient.post(this.cart_url,data);
  }

  getCart(){
    return this.httpClient.get(this.cart_url);
  }

  deleteCartByID(id:number){
    return this.httpClient.delete(this.cart_url + '/' +id);
  }

}
