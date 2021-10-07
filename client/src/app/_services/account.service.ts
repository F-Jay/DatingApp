import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/user';
// Services are Injectable and can be Injected into other Services or Components.
@Injectable({
  providedIn: 'root'
})

// Services are Singleton - Data we store in our services does not get distroyed until application is closed out.
export class AccountService {
// Make requests to API
  baseUrl = 'https://localhost:5001/api/';

  // Create an Observable - To store user in.
  private currentUserSource = new ReplaySubject<User>(1); // Type of Observable - ReplaySubject - Buffer Object - Emit Last/Many Objects inside it.
  currentUser$ = this.currentUserSource.asObservable();



  constructor(private http: HttpClient) { }

  login(model: any){
    // Want to do something with the data before it is sent back. -> pipe
    return this.http.post(this.baseUrl + 'account/login',model).pipe(
      // Anything inside pipe() is an RxJs operator.
      map((response: User) => {
        // Add statements - What do we want to do with this response.
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User)  => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }


  setCurentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user'); 
    this.currentUserSource.next(null);
  }
}
