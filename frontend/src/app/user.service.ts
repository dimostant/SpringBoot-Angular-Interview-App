import { Injectable, inject } from '@angular/core';

import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private apiUrl = 'http://localhost:8080/api/user';

  http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}s`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }

}
