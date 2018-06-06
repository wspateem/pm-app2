<<<<<<< HEAD

import {first} from 'rxjs/operators';



import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Person} from './prototype/person';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {PersonsService} from './persons.service';
@Injectable()
export class PersonResolver implements Resolve<Person> {


    constructor(private personsService: PersonsService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Person> {

        return this.personsService
            .findPersonByKey(route.params['id']).pipe(
            first());
    }

}
=======

import {first} from 'rxjs/operators';



import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Person} from './prototype/person';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {PersonsService} from './persons.service';
@Injectable()
export class PersonResolver implements Resolve<Person> {


    constructor(private personsService: PersonsService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Person> {

        return this.personsService
            .findPersonByKey(route.params['id']).pipe(
            first());
    }

}
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
