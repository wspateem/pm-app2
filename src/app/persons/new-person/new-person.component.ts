import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, MinLengthValidator  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { PersonsService } from '../persons.service';
import { Person } from '../prototype/person';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit, OnChanges  {
  person$: Observable<Person>;
  form: FormGroup;
  personId: string;
  person: Person;
  newPerson: Observable<Person>;
  isDeath=true;
  isBorn=true;
  isBapt=true;
  isCom=true;
  isCon=true;
  isWed=true;
  familyId: string;

  @Input()
  initialValue: any;


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
        familyId:[''],
        birthdate:[''],
        baptismdate: [''],
        communiondate: [''],
        confirmationdate: [''],
        weddingdate: [''],
           deathdate: ['']
      });





   }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue']) {
        this.form.patchValue(changes['familyId'].currentValue);
    };
 
}

  ngOnInit() {
    this.familyId = this.route.snapshot.queryParams['familyId'];
    console.log("family", this.familyId);
}
isErrorVisible(field: string, error: string) {
  return this.form.controls[field].dirty
         && this.form.controls[field].errors &&
         this.form.controls[field].errors[error];
}
save() {
    if (this.form.value.deathdate)
  this.form.patchValue({
    $exists: function () {},

    alive: 'false',
   

  });
  if(this.familyId){
  this.form.patchValue({
    $exists: function () {},

    familyId: this.familyId,
     });



  
  const dataToSave = this.form.value;
  this.personsService.createNewPerson2(this.familyId, dataToSave)
      .subscribe(
          () => {
              alert('Zachowano zmiany');
          },
          err => alert(`Błąd: ${err}`)
      );
}

else {
  const dataToSave = this.form.value;
  this.personsService.createNewPerson( dataToSave)
      .subscribe(
          () => {
              alert('Zachowano zmiany');
          },
          err => alert(`Błąd: ${err}`)
        );
}
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
    console.log('data urodzenia jest i jest większa od daty chrztu');
   
return true;
}
  else{
    console.log('data chrztu jest ok');
 
return false;
}
}
validComDate(){
  if (this.form.value.communiondate && this.form.value.baptismdate)
  if(this.form.value.baptismdate>this.form.value.communiondate)
  {
    console.log('data chrztu jest większa od daty komuni');
  
return true;
}
  else{
    console.log('data komuni jest ok');
 
return false;
}
}
validConDate(){
  if (this.form.value.communiondate && this.form.value.confirmationdate)
  if(this.form.value.communiondate>this.form.value.confirmationdate)
  {
    console.log('data komuni jest większa od daty bierzmowania');
   
return true;
}
  else{
    console.log('data bierzmowania jest ok');
  
return false;
}
}
validWedDate(){
  if (this.form.value.weddingdate && this.form.value.confirmationdate)
  if(this.form.value.confirmationdate>=this.form.value.weddingdate)
  {
    console.log('data bierzmowania jest większa od daty ślubu');
  
return true;
}
  else{
    console.log('data ślubu jest ok');
 
return false;
}
}

validDeatDate(){
  if (this.form.value.birthdate && this.form.value.deathdate){
  if (this.form.value.birthdate > this.form.value.deathdate){
    console.log('data smierci jest zła');
    return true;
  }
  else{
  if(this.form.value.baptismdate&&(this.form.value.baptismdate>this.form.value.deathdate))
{
  console.log('data śmierci jest zła');
  return true;
}
else{
  if (this.form.value.communiondate&&(this.form.value.communiondate>this.form.value.deathdate))
  {
    console.log('data śmierci jest zła');
    return true;
  }
  else
  {
    if(this.form.value.confirmationdate&&(this.form.value.confirmationdate>this.form.value.deathdate))
    {
      console.log('data śmierci jest zła');
      return true;
    }
    else
    {
    if(this.form.value.weddingdate&&(this.form.value.weddingdate>this.form.value.deathdate))
    {
      console.log('data śmierci jest zła');
      return true;
    }
    else
    {
      console.log('data śmierci jest ok');
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