import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]' // *ngIf / ngFor -> *appHasRole='["Admin"]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[]
  user:User;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService) 
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    }) // Get Users / Access User.
   }


  ngOnInit(): void {
    // clear the view if no roles.
    if(!this.user?.roles || this.user == null){
      this.viewContainerRef.clear();
    }

    if(this.user?.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainerRef.clear();
    }
  }

}
