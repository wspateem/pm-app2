import {Component, OnInit} from '@angular/core';
import {FamiliesService} from '../families.service';
import {PersonsService} from '../../persons/persons.service';
import {Person} from "../../persons/prototype/person";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {Family} from "../prototype/family";
import { tap } from 'rxjs/operators';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';


@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {

  personId: string;
  authInfo: AuthInfo;
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
    window.scroll(0,0);
    this.familyId = this.route.snapshot.params['id'];

    this.personsService.findAllPersons().pipe(
      tap()).subscribe(
          persons => this.allPersons = this.filtered = persons
      ); 

        this.family$ = this.familiesServices.findFamilyById(this.familyId);
        const persons$ = this.familiesServices.loadFirstPage(this.familyId, 30);
        

persons$.subscribe(persons => this.persons = persons);
this.filtered = this.allPersons;

  }

  navigateToPerson(person:Person) {

    this.router.navigate(['/person-search2', person.lname]);
   
    

}
search(search: string){
  this.filtered = this.filtered.filter(family => family.lname.toLowerCase().includes(search.toLowerCase()) );
  
  
}

}
