import {Component, OnInit, OnDestroy, EventEmitter, Input, Output} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonsService} from '../persons.service';
import {Person} from '../prototype/person';
import {Observable} from 'rxjs/Rx';
import * as _ from 'lodash';




@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  person$: Observable<Person>;
  personId: string;
  docPrint = false;

  
  @Output()
  personEmitter = new EventEmitter<Person>();
    

    constructor(private route: ActivatedRoute,
                private router: Router,
                private personsService: PersonsService) {

    }


    ngOnInit() {

      this.personId = this.route.snapshot.params['id'];

      this.person$ = this.personsService.findPersonById(this.personId);
      console.log(this.personId);
      this.myEvent(this.person$);
   
     
     
     

  }
  myEvent(event) {
    console.log(event);
    this.personEmitter.emit(event);
  }
doc(){

  this.docPrint=!this.docPrint;
}

print() {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
        //........Customized style.......
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin.document.close();
}




  }
  
  












