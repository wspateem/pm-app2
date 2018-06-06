import {tap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../security/auth.service";
import {AuthInfo} from "../security/auth-info";

@Component({
  selector: 'app-on-login',
  templateUrl: './on-login.component.html',
  styleUrls: ['./on-login.component.css']
})

export class OnLoginComponent implements OnInit {

  authInfo: AuthInfo;
  constructor(private authService:AuthService) {



  }
  

  ngOnInit() {


      this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);


  }


    logout() {
        this.authService.logout();
    }


}
