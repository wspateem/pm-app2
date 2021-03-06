
import {combineLatest as observableCombineLatest} from 'rxjs';
import {mergeMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, Subject} from 'rxjs/Rx';

import {Family} from './prototype/family';
import {Person} from '../persons/prototype/person';
import {FirebaseApp} from 'angularfire2';
import {firebaseConfig} from '../../environments/firebase.config';
import {initializeApp, auth,database} from 'firebase';
import {Http} from '@angular/http';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';

@Injectable()



export class FamiliesService {
  sdkDb: any;
  ppf: any;
  ab: any;
  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
  private http: Http) {
    this.sdkDb = fb.database().ref('families/');
    this.ppf = fb.database().ref('personsPerFamily/');
    this.ab = fb.database();
  }

  findAllFamilies(): Observable<Family[]> {
    return this.db.list('families',{
        query: {
            orderByChild: 'lname'
        }  
    }).pipe(map(Family.fromJsonArray));
}


findFamilyByName(familyName: string): Observable<Family> {
  return this.db.list('families', {
      query: {
          orderByChild: 'lname',
          equalTo: familyName
      }
  }).pipe(
  map(results => results[0]));
}
findFamilyById(familyId:string):Observable<Family> {
        return this.db.object(`families/${familyId}`)
        .map(Family.fromJson);
    }
    findFamilyByKey(familyKeys: string): Observable<Family> {
        return this.db.list('families', {
            query: {
                orderByKey: true,
                startAt: familyKeys,
                limitToFirst: 1
            }
        }).pipe(
            map(results => results[0]));
    }
    findPersonssForPersonKeys(personKeys$: Observable<string[]>) :Observable<Person[]> {
      return personKeys$.pipe(
          map(pspf => pspf.map(personKeys => this.db.object('persons/' + personKeys)) ),
          mergeMap(fbojs => observableCombineLatest(fbojs) ),)

}

    findPersonKeysPerFamilyKey(familyId:string,
      query: FirebaseListFactoryOpts = {}): Observable<string[]> {
return this.findFamilyById(familyId).pipe(
tap(),
filter(family => !!family),
switchMap(family => this.db.list(`personsPerFamily/${family.$key}`,query)),
map( pspf => pspf.map(ppf => ppf.$key) ),);
}

    loadFirstPage(familyId:string, pageSize:number): Observable<Person[]> {

      const firstPagePersonKeys$ = this.findPersonKeysPerFamilyKey(familyId,
          {
              query: {
                  limitToFirst:pageSize
              }
          });

      return this.findPersonssForPersonKeys(firstPagePersonKeys$);
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
createNewFamily(family:any): Observable<any> {

    const familyToSave = Object.assign({}, family);

    const newFamilyKey = this.sdkDb.push().key;
   
    let dataToSave = {};

    dataToSave[ newFamilyKey] = familyToSave;
      return this.firebaseUpdate(dataToSave);
  }


  }
