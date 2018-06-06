export class Person {


    constructor(
        public $key:string,
        public lname: string,
        public fname: string,
        public sname: string,
        public sex: string,
        public birthdate: string,
        public alive: boolean
        ) {

    }



    static fromJsonList(array): Person[] {
        return array.map(Person.fromJson);
    }

    static fromJson({$key, lname, fname,
        sname,sex,birthdate,alive}):Person {
        return new Person(
            $key,
            lname,
            fname,
            sname,
            sex,
            birthdate,
            alive
            );
        }
        
            static fromJsonArray(json : any[]) : Person[] {
                return json.map(Person.fromJson);
    }


}












