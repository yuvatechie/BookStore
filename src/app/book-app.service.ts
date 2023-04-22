import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookAppService {


  private OrderUrl = "https://catfact.ninja/fact";
  constructor(private httpClient: HttpClient) { }

  getCatFactData(){
    return this.httpClient.get(this.OrderUrl)
}
  
}
