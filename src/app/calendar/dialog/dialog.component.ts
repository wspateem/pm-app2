import {Component, Inject, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
import {Event } from '../prototype/event';
import { CalendarService } from '../calendar.service';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import {tap, concatAll} from 'rxjs/operators';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  events$:FirebaseListObservable<Event[]>;
  form: FormGroup;
  description:string;
  eventId: string;
  date: Date;
  time: string;
  event: Event;
  dateString: string;
  isVisibleAP= false;
  currentDate: Date;
 isOk = false;
  authInfo: AuthInfo;
  @Input()
  eventKey: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private calendarService: CalendarService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
     
      this.dateString = data['date'];
    this.currentDate = data['isToday'];

       
        this.form = fb.group({
          date: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          time: ['', Validators.required],
          description: ['', Validators.required]
      });
      }

  ngOnInit() {

this.findEvent(this.dateString);
 this.date = new Date();
 console.log(this.currentDate.getFullYear());
 console.log(this.date.getFullYear());
 console.log(this.currentDate.getMonth());
 console.log(this.date.getMonth());
 console.log(this.currentDate.getDate());
 console.log(this.date.getDate());
 if((this.currentDate.getFullYear() < this.date.getFullYear())||
 ((this.currentDate.getFullYear() >= this.date.getFullYear())&&(this.currentDate.getMonth() < this.date.getMonth()))||
 (((this.currentDate.getFullYear() >= this.date.getFullYear())&&(this.currentDate.getMonth() >= this.date.getMonth()))&&
 (this.currentDate.getDate() < this.date.getDate())))
 this.isOk=true;

console.log(this.isOk + "cwdcwcw");


this.form.patchValue({
  $exists: function () {},
date: this.dateString

});
console.log(this.form.valid)
  }
  show(event: Event){

  }
  save() {
   
    
    this.dialogRef.close(this.form.value);
}
isVisible(){
  this.isVisibleAP = !this.isVisibleAP;
}
close() {
    this.dialogRef.close();
}


findEvent(date: string){
  this.events$ = this.calendarService.findEventsByDate(date);
 
}
}
