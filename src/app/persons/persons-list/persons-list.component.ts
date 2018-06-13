import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {PersonsService} from '../persons.service';
import {Observable} from 'rxjs/Rx';
import {Person} from '../prototype/person';
import {NewPersonComponent} from '../new-person/new-person.component'
import {tap} from 'rxjs/operators';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info'

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})

export class PersonsListComponent implements OnInit {
  private isBtnVisibleOsoby = true;
  @Input()
  persons: Person[];
  


  @Output('person')
  personEmitter = new EventEmitter<Person>();
  

  authInfo: AuthInfo;
  constructor(private authService:AuthService) {



  }
  

  ngOnInit() {
    

      this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);


  }

  selectPerson(person:Person) {
    this.personEmitter.emit(person);
    
  }
    logout() {
        this.authService.logout();
    }


}
