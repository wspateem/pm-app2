
import { Component, OnInit } from '@angular/core';
import {FamiliesService} from '../families.service';
import {Observable} from 'rxjs/Rx';
import {Family} from '../prototype/family';

@Component({
  selector: 'app-families-list',
  templateUrl: './families-list.component.html',
  styleUrls: ['./families-list.component.css']
})
export class FamiliesListComponent implements OnInit {
  families$: Observable<Family[]>;

  constructor(private familiesService: FamiliesService) { }

  ngOnInit() {
  this.families$ = this.familiesService.findAllFamilies();
  }


}
