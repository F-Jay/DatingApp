import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService){}


  canDeactivate(
    // This will give access to Edit Form.
    component: MemberEditComponent): Observable<boolean> | boolean {
      if(component.editForm.dirty){
        return this.confirmService.confirm();
      }
    return true;
  }
  
}
