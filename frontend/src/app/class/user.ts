import { Address } from './address';

export class User {
    constructor(
        public  id:            number | null,
        public  name:          string,
        public  surname:       string,
        public  gender:        string,
        public  birthDate:     string, 
        //public  address:       Address,
        public workAddress:   string,
        public homeAddress:   string,
    ) {}
}