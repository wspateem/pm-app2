import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  form:FormGroup;
  
  constructor(private fb:FormBuilder, private authService: AuthService,
    private router:Router) {
      this.form = this.fb.group({
        email: ['',Validators.required],
        oldpassword: ['',Validators.required],
        newpassword: ['',Validators.required],
        confirm: ['',Validators.required]
    });
    }
    isPasswordMatch() {
      const val = this.form.value;
      return val && val.newpassword && val.newpassword == val.confirm;

    }
    updatePassword() {
      const val = this.form.value;

      this.authService.updatePassword(val.newpassword)
          .subscribe(
              () => {
                  alert('User password update successfully !');
                  this.router.navigateByUrl('/home');
              },
              err => alert(err)
          );
  }


}
