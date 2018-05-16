import { Component, OnInit } from '@angular/core';
import {PersonsService} from "./persons.service";
import {Observable} from "rxjs/Rx";
import {Person} from "./person";
import {tap} from 'rxjs/operators';
import {AuthService} from "../security/auth.service";
import {AuthInfo} from "../security/auth-info"

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  private isBtnVisibleOsoby=true;
  
  persons$: Observable<Person[]>;
  constructor(private personsService: PersonsService) {

  }




  ngOnInit() {
    
      this.persons$ = this.personsService.findAllPersons();



    }
  
  
      
  
  
  }
  