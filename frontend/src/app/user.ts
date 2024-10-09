export class User {
    constructor(
        public           id:   number | null,
        public         name:   string,
        public      surname:   string,
        public       gender:   string,
        public    birthDate:   Date, //change to Date
        public  workAddress:   string,
        public  homeAddress:   string 
    ) {}
}