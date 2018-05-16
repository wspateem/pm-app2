import {combineLatest as observableCombineLatest} from 'rxjs';
import {mergeMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Rx";
import {Person} from "./person";


import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class PersonsService {



    constructor(private db:AngularFireDatabase) {
    }

    findAllPersons():Observable<Person[]> {
        return this.db.list('persons').pipe(map(Person.fromJsonArray));
    }


    findPersonByLname(personLname:string): Observable<Person> {
        return this.db.list('persons', {
            query: {
                orderByChild: 'lname',
                equalTo: personLname
            }
        }).pipe(
        map(results => results[0]));
    }
    findPersonByFname(personFname:string): Observable<Person> {
      return this.db.list('persons', {
          query: {
              orderByChild: 'fname',
              equalTo: personFname
          }
      }).pipe(
      map(results => results[0]));
  }
  findPersonBySname(personSname:string): Observable<Person> {
    return this.db.list('persons', {
        query: {
            orderByChild: 'sname',
            equalTo: personSname
        }
    }).pipe(
    map(results => results[0]));
}
   


   


}
