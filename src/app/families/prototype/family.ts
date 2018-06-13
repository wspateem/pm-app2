<<<<<<< HEAD
import {FamiliesService} from "../families.service";
import {Observable} from "rxjs/Rx";




export class Family {

    constructor(
        public $key:string,
        public lname:string) {

    }

    static fromJson({$key, lname}) {
        return new Family($key, lname);
    }

    static fromJsonArray(json : any[]) : Family[] {
        return json.map(Family.fromJson);
    }


=======
import {FamiliesService} from "../families.service";
import {Observable} from "rxjs/Rx";




export class Family {

    constructor(
        public $key:string,
        public lname:string) {

    }

    static fromJson({$key, lname}) {
        return new Family($key, lname);
    }

    static fromJsonArray(json : any[]) : Family[] {
        return json.map(Family.fromJson);
    }


>>>>>>> 81526e695e1b0e0513596d524b2f5e385a75ad66
}