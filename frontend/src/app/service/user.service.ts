import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from '../class/user';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private apiUrl = 'http://localhost:8080/api/users';

  http = inject(HttpClient);

  getUsers(page: number, size: number) {
    return this.http.get<Page<User>>(`${this.apiUrl}?page=${page}&size=${size}`);
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
