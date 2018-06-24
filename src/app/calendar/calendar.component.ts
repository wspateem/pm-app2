
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
import { DatePipe } from '@angular/common';


export interface CalendarDate {
 
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  hollyday?: boolean;
  
  events$?: FirebaseListObservable<Event[]>; 
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {

  currentDate = moment();
  dayNames = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  montNames = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  authInfo: AuthInfo;
  isTodayDay: boolean;
  events$: FirebaseListObservable<Event[]>;
  event: Event;
  thisDate: Date;
  isDate = false;
  dateToString: string;

  @Input() 
    selectedDates: CalendarDate[] = [];
    
  
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private route: ActivatedRoute,
    private datePipe: DatePipe,
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

  select(date2: CalendarDate){
    const date = date2.mDate;
   this.thisDate = date.toDate();
   this.dateToString = date.format("YYYY-MM-DD").toString();
 
 
this.findEvent(this.dateToString);




    
    if(date.weekday()==0){
      let numberItems = 2;
    

    //alert("wybrano Niedzielę, " + this.thisDate.toLocaleDateString());
    this.isDate = true;
    setTimeout(() =>this.openDialog(date2), 1000);
  
    } else {
      let numberItems = 1;
   
   
        
   // alert("wybrano dzień powszedni, " + this.thisDate.toLocaleDateString());}

    this.isDate = true;
  setTimeout(() =>this.openDialog(date2), 1000);
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
  isHolliday(currentMoment: moment.Moment): boolean{
    const dateTest = currentMoment.toDate();
    var holly= "-01-01";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
     holly= "-01-06";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    holly= "-05-01";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    holly= "-05-03";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    holly= "-08-15";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    
    holly= "-11-01";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    holly= "-11-11";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    holly= "-12-25";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    holly= "-12-26";
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }

    var a, b, c, d, e, f, g, h, i, k, l, m, p;
    a = dateTest.getFullYear() % 19;
    b = Math.floor (dateTest.getFullYear() / 100);
c = dateTest.getFullYear() % 100;
d = Math.floor (b / 4);
e = b % 4;
f = Math.floor  ((b + 8) / 25);
g = Math.floor  ((b - f + 1) / 3);
h = (19 * a + b - d - g + 15) % 30;
i = Math.floor (c / 4);
k = c % 4;
l = (32 + 2 * e + 2 * i - h - k) % 7;
m = Math.floor  ((a + 11 * h + 22 * l) / 451);
p = (h + l - 7 * m + 114) % 31;
var day = p + 1;
var month = Math.floor ((h + l - 7 * m + 114) / 31);

if(day<10)
  holly = "-0"+month+"-0"+day;   
else
holly = "-0"+month+"-"+day;  


if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
  return true;
}  

day=day+1;
if(day==32){
month = 4;
day=1;
}
if(day<10)
  holly = "-0"+month+"-0"+day;   
else
holly = "-0"+month+"-"+day;  
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }

day=day+59;
if(month==3){
  day=day-31;
  if(day<=30){
    month = 5;
    } else{
      month=5
      day = day-30;
    }
}
else{
  if(day<=61){
    day=day-30;
    month=5;
  
}

else{
  day=day-61;
  month=6;
}
if(day<10)
  holly = "-0"+month+"-0"+day;   
else
holly = "-0"+month+"-"+day;  
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }
    if(dateTest.getDay()==0)
    return true;


}



if(day<10)
  holly = "-0"+month+"-0"+day;   
else
holly = "-0"+month+"-"+day;  
    if(moment(dateTest.getFullYear()+ holly).isSame(moment(currentMoment), 'day')){
      return true;
    }

  }
  isEventInDay(d: moment.Moment){

    const events$ = this.calendarService.findEventsByDate(this.datePipe.transform(d,"yyyy-MM-dd"));

   
    return events$;

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
                mDate: d,
                hollyday: this.isHolliday(d),
                events$: this.isEventInDay(d)
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
openDialog(date2: CalendarDate) {
  const dialogConfig = new MatDialogConfig();
const date = date2.mDate;
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  dialogConfig.data = {
    date: date2.mDate,
    hollyday: date2.hollyday
    
   };

 
  const dialogRef = this.dialog.open(DialogComponent,
    dialogConfig);
    let dataToSave ={};  

dialogRef.afterClosed().subscribe(
    val => this.calendarService.createNewEvent(val)
);
dialogRef.afterClosed().subscribe(
  val =>this.event = val); 

if(!!dataToSave){

  this.calendarService.createNewEvent(dataToSave);
}

  

}

}