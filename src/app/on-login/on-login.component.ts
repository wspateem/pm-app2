import {tap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {PersonsService} from '../persons/persons.service';
import {Person} from '../persons/person'

@Component({
  selector: 'app-on-login',
  templateUrl: './on-login.component.html',
  styleUrls: ['./on-login.component.css']
})

export class OnLoginComponent implements OnInit {
    private isBtnVisibleOsoby = true;
    allPerson: Person[];
    filtered: Person[];

  authInfo: AuthInfo;
  constructor(private authService: AuthService, private personService: PersonsService) {



  }


  ngOnInit() {
    this.personService.findAllPersons().pipe(
        tap(console.log))
        .subscribe(
persons => this.allPerson = this.filtered = persons

        );


  }

  search(search: string) {

    this.filtered = this.allPerson.filter(person => person.lname.includes(search) );

}


    logout() {
        this.authService.logout();
    }


}
