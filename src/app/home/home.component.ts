
import {tap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthInfo } from '../security/auth-info';
import { AuthService } from '../security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Plebania Millenium 2.0';

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

