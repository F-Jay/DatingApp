import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm; // Access form inside conponent.

   member: Member;
   user: User;

   @HostListener('window:beforeunload',['$event']) unloadNotification($event: any) { // Access broweser events.
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
   } 

  constructor(private accountService: AccountService, private memberService:MembersService,
     private toastr:ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user); // Get currently logged in users details. | Set user to current logged in user.
  }

  ngOnInit(): void {
    this.loadMember(); // When component is initialized.
  }

  loadMember(){
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member = member;
    })
  }
  
  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Your profile has been updated successfully")
      this.editForm.reset(this.member);
    })
  }
}
