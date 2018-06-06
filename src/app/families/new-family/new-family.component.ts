import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, MinLengthValidator  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import {Family} from "../prototype/family";
import {FamiliesService} from '../families.service';
import { Person } from '../../persons/prototype/person';

@Component({
  selector: 'app-new-family',
  templateUrl: './new-family.component.html',
  styleUrls: ['./new-family.component.css']
})
export class NewFamilyComponent implements OnInit, OnChanges {
  family$: Observable<Family>;
  form: FormGroup;
  familyId: string;
  family: Family;
  newFamily: Observable<Family>;


  @Input()
  initialValue: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private familiesService: FamiliesService,
    private db: AngularFireDatabase,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        lname: ['', [Validators.required, Validators.minLength(2)]]
      });


     }
     ngOnChanges(changes: SimpleChanges) {
      if (changes['initialValue']) {
          this.form.patchValue(changes['familyId'].currentValue);
      };
    }
  ngOnInit() {
  }
  save(){
    const dataToSave = this.form.value;
  this.familiesService.createNewFamily( dataToSave)
      .subscribe(
          () => {
              alert('Zachowano zmiany');
          },
          err => alert(`Błąd: ${err}`)
        );
  }


}
