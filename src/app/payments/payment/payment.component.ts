import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookAppService } from 'src/app/book-app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  cartItems: any;
  i: number = 0;
  sum: number = 0;
  book_rate: any;
  Date = new Date();
  id: any = 0;
  UserId = localStorage.getItem('id');
  UserEmail = localStorage.getItem('email');
  Name = localStorage.getItem('name');
  Role = localStorage.getItem('role');
  count:number=0;

  constructor(private http: BookAppService, private router: Router) {
    this.http.getCartByUserId(this.UserId).subscribe((cart) => {
      this.cartItems = cart;
      for (var i = 0; i < this.cartItems.length; i++) {
          this.sum = this.cartItems[i].bookPrice + this.sum;
          this.count = this.cartItems.length;
        }
      console.log(cart)
    })
  }

  cartDelete(id: number) {
    this.http.deleteCartByID(id).subscribe(() => {
      this.http.getCart().subscribe((cart) => {
        this.cartItems = cart;
        this.sum = this.sum - this.book_rate.bookPrice;
      })
    })
    this.http.getCartById(id).subscribe((c) => { this.book_rate = c })
  }

  addOrder() {
    //     const orderBody={
    //       Amount: this.sum
    //     }
    //   this.http.addOrder(orderBody).subscribe((res)=>{
    //     this.id=res;
    // console.log(this.id.id);
    for (var i = 0; i < this.cartItems.length; i++) {

      const bodyData = {
        UserId: Number(this.UserId),
        BookId: this.cartItems[i].bookId,
        Quantity: this.cartItems[i].quantity,
        OrderDate: this.Date,
        TotalPrice: this.sum,
        PaymentStatus: true,
        CartId: this.cartItems[i].id
      }

      console.log(bodyData)
      if (this.sum > 0) {
        this.http.addOrder(bodyData).subscribe(() => {
          this.http.deleteCartByID(this.cartItems[i].id).subscribe(()=>{
            console.log("deleted cart items")
          })
        });
      }
    }
    // }); 
  }

  sweetalert(){
    Swal.fire('Payment Done', 'Your order placed succesfully!', 'success').then((result) => {  
      if (result.value) {  
        (this.router.navigate(['/home']))   
      }
    })
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate([''])
  }

}
