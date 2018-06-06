export class Person {


    constructor(
        public $key: string,
        public lname: string,
        public fname: string,
        public sname: string,
        public street: string,
        public city: string,
        public postalcode: string,
        public sex: string,
        public birthdate: Date,
        public baptismdate: Date,
        public communiondate: Date,
        public confirmationdate: Date,
        public weddingdate: Date,
        public alive: boolean,
        public deathdate: Date
        ) {

    }



    static fromJsonList(array): Person[] {
        return array.map(Person.fromJson);
    }

    static fromJson({$key,
        lname,
        fname,
        sname,
        street,
        city,
        postalcode,
        sex, birthdate,
        baptismdate,
        communiondate,
        confirmationdate,
        weddingdate,
        alive,
        deathdate}): Person {
        return new Person(
            $key,
            lname,
            fname,
            sname,
            street,
            city,
            postalcode,
            sex,
            birthdate,
            baptismdate,
            communiondate,
            confirmationdate,
            weddingdate,
            alive,
            deathdate
            );
        }

            static fromJsonArray(json: any[]): Person[] {
                return json.map(Person.fromJson);
    }


}












