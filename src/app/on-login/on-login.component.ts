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
<<<<<<< HEAD
    private isBtnVisibleOsoby = true;
    allPerson: Person[];
    filtered: Person[];
=======
>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c

  authInfo: AuthInfo;
  constructor(private authService: AuthService, private personService: PersonsService) {



  }


  ngOnInit() {
<<<<<<< HEAD
    this.personService.findAllPersons().pipe(
        tap(console.log))
        .subscribe(
persons => this.allPerson = this.filtered = persons
=======

>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c

        );


  }

  search(search: string) {

    this.filtered = this.allPerson.filter(person => person.lname.includes(search) );

}


    logout() {
        this.authService.logout();
    }


}
