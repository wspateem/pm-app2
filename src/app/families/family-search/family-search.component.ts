import { Component, OnInit } from '@angular/core';
import {FamiliesService} from '../families.service';
import { Subject } from 'rxjs/Subject';
import { Family } from '../prototype/family';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-family-search',
  templateUrl: './family-search.component.html',
  styleUrls: ['./family-search.component.css']
})
export class FamilySearchComponent implements OnInit {
  allFamilies: Family[];
  filtered: Family[];
  constructor(private familiesService: FamiliesService) { }


  
  ngOnInit() {
    this.familiesService.findAllFamilies().pipe(
      tap(console.log)).subscribe(
          families => this.allFamilies = this.filtered = families
      ); 
  }
  search(search: string){
    this.filtered = this.allFamilies.filter(family => family.lname.toLowerCase().includes(search.toLowerCase()) );
    
    
  }
  }
  