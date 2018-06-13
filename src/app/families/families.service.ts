
import {combineLatest as observableCombineLatest} from 'rxjs';
import {mergeMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, Subject} from 'rxjs/Rx';

import {Family} from './prototype/family';
import {Person} from '../persons/prototype/person';
import {FirebaseApp} from 'angularfire2';
import {firebaseConfig} from '../../environments/firebase.config';
import {Http} from '@angular/http';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';

@Injectable()



export class FamiliesService {
  sdkDb: any;
  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
  private http: Http) {
    this.sdkDb = fb.database().ref('families/');
  }

  findAllFamilies(): Observable<Family[]> {
    return this.db.list('families').pipe(map(Family.fromJsonArray));
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
<<<<<<< HEAD

=======
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
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
    findPersonssForPersonKeys(personKeys$: Observable<string[]>) :Observable<Person[]> {
      return personKeys$.pipe(
          map(pspf => pspf.map(personKeys => this.db.object('persons/' + personKeys)) ),
          mergeMap(fbojs => observableCombineLatest(fbojs) ),)

}

    findPersonKeysPerFamilyKey(familyId:string,
      query: FirebaseListFactoryOpts = {}): Observable<string[]> {
return this.findFamilyById(familyId).pipe(
tap(val => console.log("family",val)),
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
<<<<<<< HEAD
=======
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
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

}
