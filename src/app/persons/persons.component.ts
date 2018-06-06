import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {PersonsService} from './persons.service';
import {Observable} from 'rxjs/Rx';
import {Person} from './person';
import {EditPersonComponent} from '../edit-person/edit-person.component'
import {tap} from 'rxjs/operators';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info'

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @Input()
  persons: Person[];
  private isBtnVisibleOsoby= true;

  @Output('person')
  personsEmitter = new EventEmitter<Person>();

  persons$: Observable<Person[]>;
  constructor(private personsService: PersonsService) {

  }




  ngOnInit() {

      this.persons$ = this.personsService.findAllPersons();


    }



    selectPerson(person: Person) {
      this.personsEmitter.emit(person);


  }


  }

