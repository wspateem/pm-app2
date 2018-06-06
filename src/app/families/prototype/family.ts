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


}