export class User {
    constructor(
        public  id:            number | null,
        public  name:          string,
        public  surname:       string,
        public  gender:        string,
        public  birthDate:     string, 
        public  addresses:     string[],
    ) {}
}