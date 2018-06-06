import { Component, OnInit } from '@angular/core';
import {PersonsService} from '../persons.service';
import { Subject } from 'rxjs/Subject';
import { Person } from '../prototype/person';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {
  allPersons: Person[];
  filtered: Person[];
 
  constructor(private  personsService: PersonsService) { }

  ngOnInit() {
    this.personsService.findAllPersons().pipe(
      tap(console.log)).subscribe(
          persons => this.allPersons = this.filtered = persons
      ); 
  }
search(search: string){
  this.filtered = this.allPersons.filter(person => person.lname.toLowerCase().includes(search.toLowerCase()) );
  
  
}
}
