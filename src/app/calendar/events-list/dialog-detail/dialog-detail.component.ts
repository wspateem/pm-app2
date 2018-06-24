import {Component, Inject, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../../../security/auth.service';
import {AuthInfo} from '../../../security/auth-info';
import {Event } from '../../prototype/event';
import { CalendarService } from '../../calendar.service';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import {tap, concatAll} from 'rxjs/operators';
@Component({
  selector: 'dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogComponentDetail implements OnInit {
  form: FormGroup;
  event: Event;
  event2: Event;
  description:string;
  eventId: string;
  date: Date;
  time: string;
  event$: Observable<Event>;
  dateString: string;
  isVisibleAP= false;
  currentDate: Date;
 isOk = false;
  authInfo: AuthInfo;
  @Input()  eventKey: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private calendarService: CalendarService,
    private dialogRef: MatDialogRef<DialogComponentDetail>,
    @Inject(MAT_DIALOG_DATA) data) {
     this.eventId = data['eventId'];
     this.event$ = data['event'];
       
        this.form = fb.group({
          date: ['' ,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          time: ['', Validators.required],
          description: ['', Validators.required]
      });
 
      }

  ngOnInit() {
this.calendarService.findEventById(this.eventId).subscribe(event => this.event = event);


  }

  save() {
    const dataToSave = this.form.value;
    this.calendarService.seveEvent(this.event.$key, dataToSave).subscribe(
      () => {
          alert("Zachowano zmiany");
      },
      err => alert(`Błąd: ${err}`)
  );
    
    this.dialogRef.close();
}
isVisible(){
  this.isVisibleAP = !this.isVisibleAP;
}
close() {
    this.dialogRef.close();
}
edit(){
  this.isVisible();
  this.form.patchValue({
    $exists: function () {},
    description: this.event.description,
    date: this.event.date,
    time: this.event.time
  });

}
remove()
{
  this.calendarService.deleteEvent(this.event.$key);
  this.close();
}


}
