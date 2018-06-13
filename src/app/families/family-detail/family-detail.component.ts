import {Component, OnInit} from '@angular/core';
import {FamiliesService} from '../families.service';
<<<<<<< HEAD
=======
import {PersonsService} from '../../persons/persons.service';
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
import {Person} from "../../persons/prototype/person";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {Family} from "../prototype/family";
<<<<<<< HEAD
=======
import { tap } from 'rxjs/operators';

>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {

<<<<<<< HEAD
  family$:Observable<Family>;
  persons:Person[];

familyId:string;

  constructor (private router: Router,
  private route:ActivatedRoute,
=======
  personId: string;

  family$:Observable<Family>;
  persons:Person[];
  allPersons: Person[];
  filtered: Person[];
 familyId:string;
 

  constructor (private router: Router,
  private route:ActivatedRoute,
  private  personsService: PersonsService,
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
private familiesServices: FamiliesService){  }

  ngOnInit() {
    this.familyId = this.route.snapshot.params['id'];
<<<<<<< HEAD

        this.family$ = this.familiesServices.findFamilyById(this.familyId);
        const persons$ = this.familiesServices.loadFirstPage(this.familyId, 30);
=======
    this.personsService.findAllPersons().pipe(
      tap(console.log)).subscribe(
          persons => this.allPersons = this.filtered = persons
      ); 

        this.family$ = this.familiesServices.findFamilyById(this.familyId);
        const persons$ = this.familiesServices.loadFirstPage(this.familyId, 30);
        console.log(this.personId);
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

persons$.subscribe(persons => this.persons = persons);
  }

  navigateToPerson(person:Person) {

<<<<<<< HEAD
    this.router.navigate(['persons', person.$key]);
    console.log(this.router.navigate(['persons', person.$key]));

}
=======
    this.router.navigate(['/person-search', person.$key]);
    console.log(this.router.navigate(['view', person.$key]));

}
search(search: string){
  this.filtered = this.allPersons.filter(person => person.lname.toLowerCase().includes(search.toLowerCase()) );
  
  
}
>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66

}
