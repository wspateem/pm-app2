<<<<<<< HEAD

import { Component, OnInit } from '@angular/core';
import {FamiliesService} from '../families.service';
import {Observable} from 'rxjs/Rx';
import {Family} from '../prototype/family';
=======
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FamiliesService} from '../families.service';
import {Observable} from 'rxjs/Rx';
import {Family} from '../prototype/family';
import {NewFamilyComponent } from '../new-family/new-family.component';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {
<<<<<<< HEAD
  families$: Observable<Family[]>;

  constructor(private familiesService: FamiliesService) { }

  ngOnInit() {
  this.families$ = this.familiesService.findAllFamilies();
  }


}
=======
  @Input()
  families: Family[];

  @Output('family')
  familyEmitter = new EventEmitter<Family>();
  

  authInfo: AuthInfo;

  constructor(private authService:AuthService) { }

  ngOnInit() {

    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }
  selectFamily(family:Family) {
    this.familyEmitter.emit(family);

}
logout() {
  this.authService.logout();
}
}
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
