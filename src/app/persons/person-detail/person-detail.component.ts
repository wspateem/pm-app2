import {Component, OnInit, OnDestroy, EventEmitter, Input, Output} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonsService} from '../persons.service';
import {Person} from '../prototype/person';
import {Observable} from 'rxjs/Rx';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';

import * as _ from 'lodash';
import { browser } from 'protractor';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {

 
  person$: Observable<Person>;
  personId: string;
  showHide=true;
  date = new Date();
  toBapDoc = false;
  toConToDoc = false;
  toComToDoc = false;
  toWedToDoc = false;
  toConDoc = false;
familyId: string;
familyId2: string;
  
  @Output()
  personEmitter = new EventEmitter<Person>();
    
  authInfo: AuthInfo;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private personsService: PersonsService) {

    }


    ngOnInit() {
      window.scroll(0,0);
      this.personId = this.route.snapshot.params['id'];
      this.familyId2 = this.route.snapshot.queryParams['familyId2'];
     
      this.person$ = this.personsService.findPersonById(this.personId);

      this.myEvent(this.person$);
  }

  myEvent(event) {

    this.personEmitter.emit(event);
  }
  showPanel(){
  this.showHide = !this.showHide;
  }
showToBapDoc(){
  this.toBapDoc = !this.toBapDoc;
 
 setTimeout(() =>this.print(), 500);
 }
 showToConDoc(){
  this.toConDoc = !this.toConDoc;
 
 setTimeout(() =>this.print(), 500);
 }
 showToConToDoc(){
  this.toConToDoc = !this.toConToDoc;
 
 setTimeout(() =>this.print(), 500);
 }
 showToComToDoc(){
  this.toComToDoc = !this.toComToDoc;
 
 setTimeout(() =>this.print(), 500);
 }
 showToWedToDoc(){
  this.toWedToDoc = !this.toWedToDoc;
 
 setTimeout(() =>this.print(), 500);
 }
print() {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title></title>

      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
  if(!!this.familyId2){
    this.showHide=true;
    this.toBapDoc = false;
    this.toConToDoc = false;
    this.toComToDoc = false;
    this.toWedToDoc = false;
    this.toConDoc = false;
  this.router.navigate(['/family-search', this.familyId2, this.personId + '?familyId2=' + this.familyId2]);

  }
  else{
    this.showHide=true;
    this.toBapDoc = false;
    this.toConToDoc = false;
    this.toComToDoc = false;
    this.toWedToDoc = false;
    this.toConDoc = false;
    this.router.navigate(['/person-search', this.personId]);
  }
}
deletePerson(){
  this.personsService.deletepersonPerFamily(this.personId, this.familyId2);
  this.router.navigate(['/family-search',this.familyId2]);

}

sex(val: string){
  if(val=="m"){

    return true;
  }
  else
  return false;
}
}
  
  












