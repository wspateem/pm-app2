import {tap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Person} from '../persons/person';
import {PersonsService } from '../persons/persons.service';
@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  person: Person;


  constructor(private route: ActivatedRoute,  private personsService: PersonsService ) {
    route.data.pipe(
      tap(console.log))
      .subscribe(
      data => this.person = data['person']
);
  }

  ngOnInit() {
  }

  save(person) {

    this.personsService.sevePerson(this.person.$key, person)
        .subscribe(
            () => {
                alert('person saved succesfully.');
            },
            err => alert(`error saving person ${err}`)
        );

}
}
