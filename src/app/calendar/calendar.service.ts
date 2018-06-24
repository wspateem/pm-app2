
import {mergeMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, Subject} from 'rxjs/Rx';
import {Event} from './prototype/event';
import {FirebaseApp} from 'angularfire2';
import {firebaseConfig} from '../../environments/firebase.config';
import {Http} from '@angular/http';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  sdkDb: any;
  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
  private http: Http) {
    this.sdkDb = fb.database().ref('events/');
   }
   findAllEvents(): Observable<Event[]> {
    return this.db.list('events',{
        query: {
            orderByChild: 'date',
            limitToFirst: 1
        }  
    }).pipe(map(Event.fromJsonArray));
}
findEventById(eventId:string):Observable<Event> {
  return this.db.object(`events/${eventId}`)
  .map(Event.fromJson);
}
findEventByDate(eventDate: Date): Observable<Event> {
  return this.db.list('events', {
      query: {
          orderByChild: 'date',
          equalTo: eventDate
      }
  }).pipe(
  map(results => results[0]));
}
firebaseUpdate(dataToSave) {
  const subject = new Subject();

  this.sdkDb.update(dataToSave)
      .then(
          val => {
              subject.next(val);
              subject.complete();


          },
          err => {
              subject.error(err);
              subject.complete();
          }
      );


  return subject.asObservable();
}
seveEvent(eventId: string, event): Observable<any> {

  const eventToSave = Object.assign({}, event);
  delete(eventToSave.$key);

  let dataToSave = {};
  dataToSave[`${eventId}`] = eventToSave;

  return this.firebaseUpdate(dataToSave);


}
createNewEvent(event:any): Observable<any> {

  const eventToSave = Object.assign({}, event);
  delete(eventToSave.$key);
  const newEventKey = this.sdkDb.push().key;
 
  let dataToSave = {};

  dataToSave[ newEventKey] = eventToSave;
    return this.firebaseUpdate(dataToSave);
}
deleteEvent(eventId: string) {
  const toDel = this.db.object(`events/${eventId}`);
  toDel.remove();

  
}
}
