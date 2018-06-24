export class Event {


    constructor(
        public $key: string,
        public date: Date,
        public time: string,
        public description: string
        ) {

    }

    
    static fromJsonList(array): Event[] {
        return array.map(Event.fromJson);
    }

    static fromJson({$key,
        date,
        time,
        description}): Event {
        return new Event(
            $key,
            date,
              time,
        description
            );
        }

            static fromJsonArray(json: any[]): Event[] {
                return json.map(Event.fromJson);
    }


}












