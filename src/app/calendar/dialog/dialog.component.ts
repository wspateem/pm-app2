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
import { DatePipe } from '@angular/common';
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
  hollyday: boolean;
 isOk = true;
  authInfo: AuthInfo;
  @Input()
  eventKey: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private db: AngularFireDatabase,
    private calendarService: CalendarService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
     
      this.date = data['date'];
      this.hollyday = data['hollyday'];

       
        this.form = fb.group({
          date: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          time: ['', Validators.required],
          description: ['', Validators.required]
      });
      }

  ngOnInit() {
this.dateString = this.datePipe.transform(this.date,"yyyy-MM-dd");

this.findEvent(this.dateString);

if(this.datePipe.transform(this.date,"yyyy-MM-dd")>=this.datePipe.transform(Date.now(),"yyyy-MM-dd"))
 this.isOk=false;



this.form.patchValue({
  $exists: function () {},
date: this.dateString

});

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
