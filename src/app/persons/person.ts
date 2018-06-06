<<<<<<< HEAD
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












=======
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












>>>>>>> c44ffd47ea44a0aeb11fe03f615b1607a481705c
