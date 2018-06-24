
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import { Event } from './prototype/event';
import { CalendarService } from './calendar.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponent } from './dialog/dialog.component';

export interface CalendarDate {
 
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit, OnChanges {

  currentDate = moment();
  dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  montNames = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  authInfo: AuthInfo;
  events: Event[];
  event: Event;
  newEvent = Event;
  eventKey: string;
  description: string;
  isHoliday: boolean;
  thisDate: Date;

  @Input() 
    selectedDates: CalendarDate[] = [];
    
  
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private calendarService: CalendarService,
    

  ) {}

  ngOnInit(): void {
    this.generateCalendar();
    this.thisDate = this.currentDate.toDate();
    this.calendarService.findAllEvents()
    .subscribe(events => this.events = events
      .filter(event => event.date === this.thisDate));
      console.log("111111 " + this.events);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
      this.firstMonth
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
findEvent(date: moment.Moment){
  console.log(this.calendarService.findAllEvents()
  .subscribe(events => this.events = events
    .filter(event => event.date === date.toDate())));
    console.log("222222 " + this.events);
 if(this.calendarService.findAllEvents()
    .subscribe(events => this.events = events
      .filter(event => event.date === date.toDate())))
      return true;
      else 
      return false;
}

  select(date: moment.Moment){
   this.thisDate = date.toDate();
   if(this.findEvent(date)){
    alert("wybrano dzień z intencją");
   }
    
console.log(this.thisDate.toLocaleDateString());


    if(date.weekday()==0){
      let numberItems = 2;
      this.openDialog();

    alert("wybrano Niedzielę, " + this.thisDate.toLocaleDateString());
    } else {
      let numberItems = 1;
        this.openDialog();
   
        
    alert("wybrano dzień powszedni, " + this.thisDate.toLocaleDateString());}
    

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
  openDialog( ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      
      
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
  editEvent(event) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = event;

    const dialogRef = this.dialog.open(DialogComponent,
        dialogConfig);


    dialogRef.afterClosed().subscribe(
        val => console.log("Dialog output:", val)
    );

}
}