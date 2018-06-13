import {Component, OnInit} from '@angular/core';
import {FamiliesService} from '../families.service';
import {Person} from "../../persons/prototype/person";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {Family} from "../prototype/family";

@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit {

  family$:Observable<Family>;
  persons:Person[];

familyId:string;

  constructor (private router: Router,
  private route:ActivatedRoute,
private familiesServices: FamiliesService){  }

  ngOnInit() {
    this.familyId = this.route.snapshot.params['id'];

        this.family$ = this.familiesServices.findFamilyById(this.familyId);
        const persons$ = this.familiesServices.loadFirstPage(this.familyId, 30);

persons$.subscribe(persons => this.persons = persons);
  }

  navigateToPerson(person:Person) {

    this.router.navigate(['persons', person.$key]);
    console.log(this.router.navigate(['persons', person.$key]));

}

}
