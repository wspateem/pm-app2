
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { Event } from './prototype/event';
import {tap} from 'rxjs/operators';
import { CalendarService } from './calendar.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponent } from './dialog/dialog.component';
import { FirebaseListObservable } from 'angularfire2/database';
import { EventsComponent} from './events/events.component';

export interface CalendarDate {
 
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit, OnChanges {
  eventDate: moment.Moment;
  currentDate = moment();
  dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  montNames = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  authInfo: AuthInfo;
  isTodayDay: boolean;
  events$: FirebaseListObservable<Event[]>;
  event: Event;
  isHoliday: boolean;
  thisDate: Date;
  isDate = false;
  dateToString: string;

  @Input() 
    selectedDates: CalendarDate[] = [];
    
  
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private calendarService: CalendarService
    

  ) {}

  ngOnInit(): void {

    this.generateCalendar();
    this.thisDate = this.currentDate.toDate();    
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
      
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

findEvent(date: string){
  this.events$ = this.calendarService.findEventsByDate(date);
 
}

  select(date: moment.Moment){
   this.thisDate = date.toDate();
   this.dateToString = date.format("YYYY-MM-DD").toString();
 
 
this.findEvent(this.dateToString);




    
    if(date.weekday()==0){
      let numberItems = 2;
    

    //alert("wybrano Niedzielę, " + this.thisDate.toLocaleDateString());
    this.isDate = true;
    setTimeout(() =>this.openDialog(this.dateToString), 1000);
  
    } else {
      let numberItems = 1;
   
   
        
   // alert("wybrano dzień powszedni, " + this.thisDate.toLocaleDateString());}

    this.isDate = true;
  setTimeout(() =>this.openDialog(this.dateToString), 1000);
  }
}

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }


  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
      const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d
              };
            });
  }
 /*
  openDialog(events$: FirebaseListObservable<Event[]>) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      events$: events$,
    
      
     };

   
    const dialogRef = this.dialog.open(DialogComponent,
      dialogConfig);
      let dataToSave ={};  

  dialogRef.afterClosed().subscribe(
      val => this.calendarService.createNewEvent(val)
  );
  dialogRef.afterClosed().subscribe(
    val =>this.event = val); 
console.log(this.event);
  if(!!dataToSave){
  
    this.calendarService.createNewEvent(dataToSave);
  }

    

}
 */
openDialog(date: string) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.data = {
    date: date,
    isToday: this.thisDate
    
   };

 
  const dialogRef = this.dialog.open(DialogComponent,
    dialogConfig);
    let dataToSave ={};  

dialogRef.afterClosed().subscribe(
    val => this.calendarService.createNewEvent(val)
);
dialogRef.afterClosed().subscribe(
  val =>this.event = val); 
console.log(this.event);
if(!!dataToSave){

  this.calendarService.createNewEvent(dataToSave);
}

  

}

}