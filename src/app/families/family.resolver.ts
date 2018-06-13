
import {first} from 'rxjs/operators';



import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Family} from './prototype/family';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {FamiliesService} from './families.service';
@Injectable()
export class FamilyResolver implements Resolve<Family> {


    constructor(private familiesService: FamiliesService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Family> {

        return this.familiesService
            .findFamilyByKey(route.params['id']).pipe(
            first());
    }
    

}
