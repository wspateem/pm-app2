import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subject } from 'rxjs/Subject';
import {Event } from '../prototype/event';
import { tap } from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {
  allEvents: Event[];
  event: Event;
  filtered: Event[];
  eventId: string;
  currentDate: Date = new Date();
serachDate: Date;
  authInfo: AuthInfo;


  constructor( private calendarService: CalendarService, private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute) {}


  ngOnInit() {
    window.scroll(0,0);
    this.calendarService.findAllEvents2().pipe(
      tap(console.log)).subscribe(
        events => this.allEvents = this.filtered = events);
        this.filtered = this.allEvents;
  }

  ngOnDestroy(){}

  search(search: string){
    this.filtered = this.filtered.filter(event => event.description.toLowerCase().includes(search.toLowerCase()) ||  event.date.toString().includes(search) );
        
  }


}
