import { Component, OnInit } from '@angular/core';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
    private isBtnVisibleOsoby = true;


  authInfo: AuthInfo;

  constructor(private authService: AuthService) {


  }

  ngOnInit() {


      this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);


  }


    logout() {
        this.authService.logout();
    }


}
