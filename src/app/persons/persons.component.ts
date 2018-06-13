<<<<<<< HEAD
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {PersonsService} from './persons.service';
import {Observable} from 'rxjs/Rx';
import {Person} from './person';
import {EditPersonComponent} from '../edit-person/edit-person.component'
import {tap} from 'rxjs/operators';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info'
=======
import { Component, OnInit } from '@angular/core';
import {PersonsService} from "./persons.service";
import {Observable} from "rxjs/Rx";
import {Person} from "./person";
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
<<<<<<< HEAD
  @Input()
  persons: Person[];
  private isBtnVisibleOsoby= true;

  @Output('person')
  personsEmitter = new EventEmitter<Person>();

=======
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
  persons$: Observable<Person[]>;
  constructor(private personsService: PersonsService) {

  }




  ngOnInit() {
<<<<<<< HEAD

      this.persons$ = this.personsService.findAllPersons();
=======
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c

      this.persons$ = this.personsService.findAllPersons();

<<<<<<< HEAD
    }



    selectPerson(person: Person) {
      this.personsEmitter.emit(person);


  }


  }

=======
  }

}
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
