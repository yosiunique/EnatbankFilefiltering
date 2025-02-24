import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XhrInterceptorService implements HttpInterceptor{
constructor() {}

 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ localStorage.getItem('access_token')        }
      })
    }
    return next.handle(req)

  }

  
}