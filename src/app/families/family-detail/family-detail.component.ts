import {Component, OnInit} from '@angular/core';
import {FamiliesService} from '../families.service';
import {PersonsService} from '../../persons/persons.service';
import {Person} from "../../persons/prototype/person";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {Family} from "../prototype/family";
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {

  personId: string;

  family$:Observable<Family>;
  persons:Person[];
  allPersons: Person[];
  filtered: Person[];
 familyId:string;
 

  constructor (private router: Router,
  private route:ActivatedRoute,
  private  personsService: PersonsService,
private familiesServices: FamiliesService){  }

  ngOnInit() {
    this.familyId = this.route.snapshot.params['id'];
    this.personsService.findAllPersons().pipe(
      tap(console.log)).subscribe(
          persons => this.allPersons = this.filtered = persons
      ); 

        this.family$ = this.familiesServices.findFamilyById(this.familyId);
        const persons$ = this.familiesServices.loadFirstPage(this.familyId, 30);
        console.log(this.personId);

persons$.subscribe(persons => this.persons = persons);
  }

  navigateToPerson(person:Person) {

    this.router.navigate(['/person-search', person.$key]);
    console.log(this.router.navigate(['view', person.$key]));

}
search(search: string){
  this.filtered = this.allPersons.filter(person => person.lname.toLowerCase().includes(search.toLowerCase()) );
  
  
}

}
