import {Component, Inject, OnInit, ViewEncapsulation, EventEmitter, Input, Output} from '@angular/core';
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
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponentDetail } from './dialog-detail/dialog-detail.component';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events$: Observable<Event[]>;
  @Input()
  events: Event[];
  eventKey: string;
  event$: Observable<Event>;
  description:string;
  eventId: string;
  date: Date;
  time: string;
  event: Event;
  dateString: string;
  isVisibleAP= false;
  currentDate: Date;
 isOk = false;


  @Output()
  eventEmitter = new EventEmitter<Event>();

  authInfo: AuthInfo;
  constructor(   
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private calendarService: CalendarService) { 
    }

  ngOnInit() {
    window.scroll(0,0);
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }

  myEvent(event) {

    this.eventEmitter.emit(event);
  }
  open(any: string){

   this.event$ = this.calendarService.findEventById(any);
   this.myEvent(this.event$);
    console.log("ksdkjsfdghkjsdag" + any);
    setTimeout(() =>this.openDialog(any), 1000);
  }
  openDialog( any) {
    const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
    dialogConfig.data = {
      eventId: any,
      event: this.event$
           
     };

  
      const dialogRef = this.dialog.open(DialogComponentDetail,
        dialogConfig);

  }
}
