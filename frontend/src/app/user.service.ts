import { Injectable, inject } from '@angular/core';

import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private apiUrl = 'http://localhost:8080/api/users';

  http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(this.apiUrl)
  }

}
