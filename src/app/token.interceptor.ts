import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookAppService } from './book-app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private http: BookAppService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken=this.http.getToken();

    const userRole=localStorage.getItem('role')
    if (myToken && userRole === 'Admin') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${myToken}`,
          'X-Admin-Role': 'true'
        }
      });
}
    return next.handle(request);
  }
}
