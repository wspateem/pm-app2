import { Component, OnInit, OnDestroy } from '@angular/core';
import {PersonsService} from '../persons.service';
import { Subject } from 'rxjs/Subject';
import { Person } from '../prototype/person';
import { tap } from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";
import { FamiliesService } from '../../families/families.service';
import { Family } from '../../families/prototype/family';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {
  allPersons: Person[];
  filtered: Person[];
  familyId: string;
  family2: Family;
  authInfo: AuthInfo;
url: string;
 
  constructor(private  personsService: PersonsService,
    private router: Router,
    private familiesService: FamiliesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0);
 this.url = this.route.snapshot.url.toString();
 console.log(this.url);
 if(this.url == "person-search"){
   this.url = "/person-search2";
 } else{
  this.url = "/person-search";
 }

    this.route.queryParams.subscribe(queryParams => this.familyId = queryParams.familyId
    );
    this.familyId = this.route.snapshot.queryParams['familyId2'];
      this.personsService.findAllPersons().pipe(
      tap(console.log)).subscribe(
          persons => this.allPersons = this.filtered = persons.filter(person => person.familyId !==this.familyId )
      ); 
  }
  ngOnDestroy(){}


 



  getFamilyName(familyId){
    if(!!this.familyId){
  this.familiesService.findFamilyById(familyId).subscribe(family => this.family2 = family);
  return this.family2.lname;
      
    }
  }
search(search: string){
  this.filtered = this.allPersons.filter(person => person.lname.toLowerCase().includes(search.toLowerCase()) || person.fname.toLowerCase().includes(search.toLowerCase()) || person.birthdate.toString().includes(search));
  
  
}

}
