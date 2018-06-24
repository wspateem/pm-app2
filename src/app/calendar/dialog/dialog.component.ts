import {Component, Inject, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthService} from '../../security/auth.service';
import {AuthInfo} from '../../security/auth-info';
import {Event } from '../prototype/event';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import {tap} from 'rxjs/operators';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  event$: Observable<Event>;
  form: FormGroup;
  newEvent: Observable<Event>;
  description:string;
  eventId: string;
  date: Date;
  time: string;
  event: Event;
  @Input()
  eventKey: string;
  authInfo: AuthInfo;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
     


       
        this.form = fb.group({
          date: ['', Validators.required],
          time: ['', Validators.required],
          description: ['', Validators.required]
      });
      }

  ngOnInit() {
    console.log(this.date);
  }
  save() {
   
    
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
}
