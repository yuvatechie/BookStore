import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BookAppService } from '../book-app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  // OrderApiData :any

  // constructor(private getData:BookAppService){
  //   getData.getCatFactData().subscribe(x=>{
  //     console.log(x)
  //     this.OrderApiData = x
  //   })
  // }
}
