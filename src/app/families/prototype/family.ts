import {FamiliesService} from "../families.service";
import {Observable} from "rxjs/Rx";




export class Family {

    constructor(
        public $key:string,
        public lname: string,
        public description: string) {

    }

    static fromJson({$key, lname, description}) {
        return new Family($key, lname, description);
    }

    static fromJsonArray(json : any[]) : Family[] {
        return json.map(Family.fromJson);
    }


}