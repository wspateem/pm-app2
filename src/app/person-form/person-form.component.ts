import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit, OnChanges  {
  form: FormGroup;
  @Input()
  initialValue: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      lname: ['', Validators.required],
      fname: ['', Validators.required],
      sname: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalcode: ['', Validators.required],
      sex: [''],
      birthdate: [''],
      baptismdate: [''],
      communiondate: [''],
      confirmationdate: [''],
      weddingdate: [''],
      alive: [''],
      deathdate: ['']

});
   }
   ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue']) {
        this.form.patchValue(changes['initialValue'].currentValue);
    }
}

  ngOnInit() {
  }
  isErrorVisible(field: string, error: string) {

    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[error];

}
reset() {
  this.form.reset();
}
get valid() {
  return this.form.valid;
}

get value() {
  return this.form.value;
}

}
