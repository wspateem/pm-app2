
import {mergeMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, Subject} from 'rxjs/Rx';
import {Person} from './prototype/person';
import {FirebaseApp} from 'angularfire2';
import {firebaseConfig} from '../../environments/firebase.config';
import {Http} from '@angular/http';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';




@Injectable()
export class PersonsService {
    newpersonId: any;
    sdkDb: any;
    sdkDb2: any;
    sdkDb3: any;
    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
    private http: Http) {

this.sdkDb = fb.database().ref('persons/');
this.sdkDb2 = fb.database().ref('personsPerFamily/');
this.sdkDb3 = fb.database();



}


    findAllPersons(): Observable<Person[]> {
        return this.db.list('persons',{
            query: {
                orderByChild: 'lname'
            }  
        }).pipe(map(Person.fromJsonArray));
    }
    findPersonByFamilyId(personFamilyId: string): Observable<Person> {
        return this.db.list('persons', {
            query: {
                orderByChild: 'familyId',
                equalTo: personFamilyId
            }
        }).pipe(
        map(results => results[0]));
    }
  


    findPersonByLname(personLname: string): Observable<Person> {
        return this.db.list('persons', {
            query: {
                orderByChild: 'lname',
                equalTo: personLname
            }
        }).pipe(
        map(results => results[0]));
    }

    findPersonById(personId:string):Observable<Person> {
        return this.db.object(`persons/${personId}`)
        .map(Person.fromJson);
    }
    findPersonByKey(personKeys: string): Observable<Person> {
        return this.db.list('persons', {
            query: {
                orderByKey: true,
                startAt: personKeys,
                limitToFirst: 1
            }
        }).pipe(
            map(results => results[0]));
    }
    findPersonByKey1($key: string) {
        return this.db.object('persons/' + '$key');
    }

    findPersonByFname(personFname: string): Observable<Person> {
      return this.db.list('persons', {
          query: {
              orderByChild: 'fname',
              equalTo: personFname
          }
      }).pipe(
      map(results => results[0]));
  }
  findPersonBySname(personSname: string): Observable<Person> {
    return this.db.list('persons', {
        query: {
            orderByChild: 'sname',
            equalTo: personSname
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
firebaseUpdate2(dataToSave) {
    const subject = new Subject();

    this.sdkDb2.update(dataToSave)
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
sevePerson(personId: string, person): Observable<any> {

    const personToSave = Object.assign({}, person);
    delete(personToSave.$key);

    let dataToSave = {};
    dataToSave[`${personId}`] = personToSave;

    return this.firebaseUpdate(dataToSave);


}
createNewPerson(person:any): Observable<any> {

    const personToSave = Object.assign({}, person);

    const newPersonKey = this.sdkDb.push().key;
   
    let dataToSave = {};

    dataToSave[ newPersonKey] = personToSave;
      return this.firebaseUpdate(dataToSave);
  }
  createNewPerson2(familyId:string, person:any): Observable<any> {

    const personToSave = Object.assign({}, person, {familyId});

    const newPersonKey = this.sdkDb2.push().key;
    this.newpersonId = newPersonKey;

    let dataToSave = {};

    dataToSave[newPersonKey] = personToSave;
   


    return this.firebaseUpdate(dataToSave)&& this.createPersonPerFamily(this.newpersonId, familyId);
}

createPersonPerFamily(newPersonKey: string, familyId: string)  {
        let dataToSave2 = {};      
        let personToAdd = this.findPersonById(newPersonKey).subscribe(person => personToAdd = person);


        dataToSave2[`${familyId}/${newPersonKey}`]= true;

        return this.firebaseUpdate2(dataToSave2);
        


}    
deletepersonPerFamily(personId: string, familyId: string) {
    const toDel = this.db.object(`personsPerFamily/${familyId}/${personId}`);
    toDel.remove();
    const toDel2 = this.db.object(`pesons/${personId}/familyId`);
    this.db.object(`persons/${personId}`)
    .update({ familyId: "" });  
    
}





isPersonAlive(personId: string): Observable<Person> {
    return this.db.object(`persons/${personId}.alive`);
}





findPersonById2(personId:string):Observable<Person> {
    return this.db.object(`persons/${personId}`)
    .map(Person.fromJson);}
}
