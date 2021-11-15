import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { PresenceService } from './presence.service';
// Services are Injectable and can be Injected into other Services or Components.
@Injectable({
  providedIn: 'root'
})

// Services are Singleton - Data we store in our services does not get distroyed until application is closed out.
export class AccountService {
// Make requests to API
  baseUrl = environment.apiUrl;

  // Create an Observable - To store user in.
  private currentUserSource = new ReplaySubject<User>(1); // Type of Observable - ReplaySubject - Buffer Object - Emit Last/Many Objects inside it.
  currentUser$ = this.currentUserSource.asObservable();



  constructor(private http: HttpClient, private presence: PresenceService) { }

  login(model: any){
    // Want to do something with the data before it is sent back. -> pipe
    return this.http.post(this.baseUrl + 'account/login',model).pipe(
      // Anything inside pipe() is an RxJs operator.
      map((response: User) => {
        // Add statements - What do we want to do with this response.
        const user = response;
        if(user){
          this.setCurentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User)  => {
        if(user){
          this.setCurentUser(user);
          this.presence.createHubConnection(user);
        }
        return user;
      })
    )
  }


  setCurentUser(user:User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user'); 
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1])); // Token has three parts: Header, Payload, Signature.
  }
}
