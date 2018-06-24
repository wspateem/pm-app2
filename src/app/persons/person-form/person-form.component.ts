import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonsService} from '../persons.service';
import {Person} from '../prototype/person';
import {Observable} from 'rxjs/Rx';
import {tap} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit  {
  person$: Observable<Person>;
  form: FormGroup;
  personId: string;
  person: Person; 
  newPerson: Observable<Person>;
  url: string;
  isDeath=true;
  isBorn=true;
  isBapt=true;
  isCom=true;
  isCon=true;
  isWed=true;
  familyId: string;
  @Input()
  personKey: string;
  authInfo: AuthInfo;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private personsService: PersonsService,
    private db: AngularFireDatabase,
    private fb: FormBuilder) {
     this.form = this.fb.group({
        lname: ['', [Validators.required, Validators.minLength(2)]],
        fname: ['', [Validators.required, Validators.minLength(2)]],
        sname: ['', [Validators.minLength(2)]],
        street: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postalcode: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+-[0-9]{2,3}$')]],
        sex:['', [Validators.required]],
        birthdate:[''],
        baptismdate: [''],
        communiondate: [''],
        familyId: [''],
        confirmationdate: [''],
        weddingdate: [''],
        alive: [''],
        deathdate: ['']
      });
      route.data.pipe(
        tap(console.log))
        .subscribe(
        data => this.person = data['person']
      );
    }
  ngOnInit() {
    window.scroll(0,0);
    this.personId = this.route.snapshot.params['id2'];
    this.familyId = this.route.snapshot.queryParams['familyId2'];
    console.log(this.familyId);

    this.person$ = this.personsService.findPersonById(this.personId);
    console.log(this.personId);
    
    this.form.patchValue({
      $exists: function () {},
      lname: this.person.lname,
      fname: this.person.fname,
      sname: this.person.sname,
      street: this.person.street,
      city: this.person.city,
      postalcode: this.person.postalcode,
      sex: this.person.sex,
      birthdate: this.person.birthdate,
      baptismdate: this.person.baptismdate,
      communiondate: this.person.communiondate,
      familyId: this.person.familyId,
      confirmationdate: this.person.confirmationdate,
      weddingdate: this.person.weddingdate,
      alive: this.person.alive,
      deathdate: this.person.deathdate
    });
this.url = "/person-search/" + this.personId;
  }
save() {
  if (this.form.value.deathdate){
  this.form.patchValue({
    $exists: function () {},
    alive: 'false',
  });
}
else{
  this.form.patchValue({
    $exists: function () {},
    alive: 'true',
  });
}
  const dataToSave = this.form.value;
  this.personsService.sevePerson(this.person.$key, dataToSave)
      .subscribe(
          () => {
              alert("Zachowano zmiany");
          },
          err => alert(`Błąd: ${err}`)
      );
}
isValid(){
  if (this.form.value.birthdate){
    this.isBorn=true;
  }
  else{
    this.isBorn=true;
  }
  if(this.form.value.deathdate){
    if(!this.validDeatDate())
    {
      this.isDeath=true;
    }
    else{
      this.isDeath=false;
    }
  }
  if(this.form.value.baptismdate){
    if(!this.validBapDate()){
      this.isBapt=true;
    }
    else{
      this.isBapt=false;
    }
  }
  if(this.form.value.communiondate){
    if(!this.validComDate()){
      this.isCom=true;
    }
    else{
      this.isCom=false;
    }
  }
  if(this.form.value.confirmationdate){
    if(!this.validConDate()){
      this.isCon=true;
    }
    else{
      this.isCon=false;
    }
  }
  if(this.form.value.weddingdate){
    if(!this.validWedDate()){
      this.isWed=true;
    }
    else{
      this.isWed=false;
    }
  }
  return this.form.valid&&this.isBapt&&this.isBorn&&this.isCom&&this.isCon&&this.isWed&&this.isDeath;
}
validBapDate(){
  if (this.form.value.birthdate && this.form.value.baptismdate)
 if(this.form.value.birthdate >this.form.value.baptismdate)
  {
return true;
}
  else{
return false;
}
}
validComDate(){
  if (this.form.value.communiondate && this.form.value.baptismdate)
  if(this.form.value.baptismdate>this.form.value.communiondate)
  {
return true;
}
  else{
return false;
}
}
validConDate(){
  if (this.form.value.communiondate && this.form.value.confirmationdate)
  if(this.form.value.communiondate>this.form.value.confirmationdate)
  {
return true;
}
  else{
return false;
}
}
validWedDate(){
  if (this.form.value.weddingdate && this.form.value.confirmationdate)
  if(this.form.value.confirmationdate>=this.form.value.weddingdate)
  {
return true;
}
  else{
return false;
}
}
validDeatDate(){
  if (this.form.value.birthdate && this.form.value.deathdate){
  if (this.form.value.birthdate > this.form.value.deathdate){
    return true;
  }
  else{
  if(this.form.value.baptismdate&&(this.form.value.baptismdate>this.form.value.deathdate))
{
  return true;
}
else{
  if (this.form.value.communiondate&&(this.form.value.communiondate>this.form.value.deathdate))
  {
    return true;
  }
  else
  {
    if(this.form.value.confirmationdate&&(this.form.value.confirmationdate>this.form.value.deathdate))
    {
      return true;
    }
    else
    {
    if(this.form.value.weddingdate&&(this.form.value.weddingdate>this.form.value.deathdate))
    {
      return true;
    }
    else
    {
      return false;
    }
    }
  }
}
}
}
return false;
}
}
