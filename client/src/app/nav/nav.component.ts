import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {}
  // Added Private variable Account Service to Login Our User.
  constructor(public accountService: AccountService, private router:Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser(); // Get Current User from AccountService. | Replaced with Async Pipe.
  }

  login(){
    //console.log(this.model)
    this.accountService.login(this.model).subscribe(response => { // Subscribing to Observable on Login - And setting Logged in Status = True.
      this.router.navigateByUrl('/members'); // When user logs in -> redirect them to the members component.
      //this.loggedIn = true;
    }
    )
  }

  logout(){
    this.accountService.logout();
    //this.loggedIn = false;
    this.router.navigateByUrl('/'); // When user logs out -> redirect them to the home/root component.
  }

  // Replaced with Async Pipe
 /* getCurrentUser(){ 
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user; // !! turns object into boolean.
    },error => {
      console.log(error);
    })
  }
  */
}
