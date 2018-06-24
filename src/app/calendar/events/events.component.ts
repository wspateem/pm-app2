import {Component, Inject, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
import {Event } from '../prototype/event';
import { CalendarService } from '../calendar.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import {tap, concatAll} from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input()  eventDate: moment.Moment;
  datePipe: any;
  event: Event;
  events: Event[];
  date: Date;
  event$: Observable<Event>;
  events$: Observable<Event[]>;
  authInfo: AuthInfo;



  constructor( private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private calendarService: CalendarService) {


     }

  ngOnInit() {
    console.log(this.eventDate);
    this.date = this.eventDate.toDate();
    console.log(this.date);

    this.events$ = this.calendarService.findEventByDate(this.datePipe.transform(this.date, "yyyy-MM-dd"));
   // 
   // this.events$.subscribe(events => this.events = events); 

    
  }

}
