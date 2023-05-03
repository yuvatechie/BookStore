import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookAppService {

// <--------------- auth guard ---------->
private loggedIn = false;
private isAdminUser = false;

login(username: string, password: string) {
  // Perform login logic
  if (username === 'admin' && password === 'password') {
    this.isAdminUser = true;
  }
  this.loggedIn = true;
}

logout() {
  // Perform logout logic
  return this.loggedIn = false;
  return this.isAdminUser
}

isLoggedIn(){
 return this.loggedIn;
}

isAdmin(){
  return this.isAdminUser
}




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

private Authurl="https://bsapi6191.azurewebsites.net/api/Users/login";
getAuthinfo(loginuser: any): Observable<AuthResponse> {
  return this.httpClient.post<AuthResponse>(`${this.Authurl}`, loginuser);
}

storeToken(data:any){
  localStorage.setItem('token',data.token);
  localStorage.setItem('id',data.id);
  localStorage.setItem('role',data.role);
  localStorage.setItem('email',data.email);
  localStorage.setItem('name',data.name);
 }
 getToken(){
  return localStorage.getItem('token');
 }

private UserInfoUrl ="https://bsapi6191.azurewebsites.net/api/Users";

getUserinfo(){
  return this.httpClient.get(this.UserInfoUrl);
}

postUserinfo(user:any){
  return this.httpClient.post(this.UserInfoUrl,user);
}

//authentication based token
// userAuthentication(username,password){

// }


 private url='https://localhost:7163/api/Orders';
 OrderApi(){ 
  return this.httpClient.get(this.url)
 }

 //book crud and cart part

 book_url = "https://bsapi6191.azurewebsites.net/api/Books";
 cart_url = "https://bsapi6191.azurewebsites.net/api/Carts";
 order_url = "https://bsapi6191.azurewebsites.net/api/Orders"; 

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

  getCartByUserId(id:any){
    return this.httpClient.get("https://bsapi6191.azurewebsites.net/api/Carts/cartsByUsersId?userId="+id)
  }

  getBookByBookId(){
    return this.httpClient.get("https://bsapi6191.azurewebsites.net/api/Carts/carts-with-orders");
  }

  deleteCartByID(id:number){
    return this.httpClient.delete(`${this.cart_url}/${id}`);
  }

  getCartById(id:number){
    return this.httpClient.get(this.cart_url + '/' + id);
  }

  addOrderItems(data:any){
    return this.httpClient.post(this.order_url,data);
  }

  getOrder()
  {
     return this.httpClient.get(this.order_url);
  }

  deleteOrderById(id:number){
    return this.httpClient.delete(this.order_url+'/'+id)
  }

  addOrder(data:any){
    return this.httpClient.post(this.order_url,data);
  }

}
