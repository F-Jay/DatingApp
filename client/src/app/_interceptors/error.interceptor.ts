import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor { // Http Interceptor

  constructor(private router: Router, private toastr: ToastrService) {}

  // Intercept the request that goes out | or Intercept the response that comes back in the next*
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Gets an observerble wich requires pipe if you want to do something with it.
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch (error.status) {
            case 400: {
              if(error.error.error){
                const modalStateErrors = [];
                for(const key in error.error.error){
                  if(error.error.error[key]){
                    modalStateErrors.push(error.error.error[key]);
                  }
                }
                throw modalStateErrors.flat();
              }else{
                this.toastr.error(error.statusText, error.status);
              }
            }
              break;
              case 401: {
                this.toastr.error(error.statusText,error.status);
              }
              break;
              case 404:{
                this.router.navigateByUrl('/not-found');
              }break;
              case 500:{
                const navigationExtras: NavigationExtras = {state: {error:error.error}} // Adding the error to the router state.
                this.router.navigateByUrl('/server-error',navigationExtras);
              }
              break;
            default:{
              this.toastr.error("Something unexpected went wrong.");
            }
              break;
          }
        }

        return throwError(error);
      })
    );
  }
}
