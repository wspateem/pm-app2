import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {PersonsService} from '../persons.service';
import {FamiliesService } from '../../families/families.service';
import {Observable} from 'rxjs/Rx';
import {Person} from '../prototype/person';
import {NewPersonComponent} from '../new-person/new-person.component'
import {tap} from 'rxjs/operators';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})

export class PersonsListComponent implements OnInit {
  @Input()
  persons: Person[];
  familyId: string;
  familyId2: string;
  link: string;
  person2:Person;

  @Output('person')
  personEmitter = new EventEmitter<Person>();
  authInfo: AuthInfo;
  constructor(private authService:AuthService,
    private router: Router,
    private familiesService: FamiliesService,
    private personsService: PersonsService,
    private route:ActivatedRoute) { }
  ngOnInit() {
    window.scroll(0,0);
    this.familyId = this.route.snapshot.queryParams['familyId2'];
    this.familyId2 = this.route.snapshot.params['id'];
    console.log(this.familyId2);
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);


  }

  selectPerson(person:Person) {
    
    this.personEmitter.emit(person);
  }
  addPersonToFamily(familyId: string, personId: string) {
    this.personsService.findPersonById(personId).subscribe(person => this.person2 = person);
    console.log(this.person2);
   if(this.person2.familyId == this.familyId){
      alert ("Wybrana osoba jest już przypisana do tej rodziny");
    }
    else
    {
      if(this.person2.familyId != ""){
        if(confirm(this.person2.lname + " " +  this.person2.fname + " jest przypisany do innej rodziny, czy chcesz kontynuować?")){
          this.personsService.deletepersonPerFamily(personId, this.person2.familyId);
          this.person2.familyId = familyId;
          this.personsService.createPersonPerFamily(personId, this.person2.familyId);
          //let familyToDel = this.familiesService.findFamilyByKey(familyId).subscribe(family => familyToDel = family);
          
      
      const dataToSave = this.person2;
      
    
    this.personsService.sevePerson(this.person2.$key, dataToSave)
    .subscribe(
        () => {
            alert("Zachowano zmiany");
        },
        err => alert(`Błąd: ${err}`)
    );
    
  }}
  else{
     
    this.person2.familyId = familyId;
    const dataToSave = this.person2;
    this.personsService.createPersonPerFamily(personId, familyId);
  
  this.personsService.sevePerson(this.person2.$key, dataToSave)
  .subscribe(
      () => {
          alert("Zachowano zmiany");
      },
      err => alert(`Błąd: ${err}`)
  );

  
}
      }
    
    
    }
  
    logout() {
        this.authService.logout();
    }


}
