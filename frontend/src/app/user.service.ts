import { Injectable, inject } from '@angular/core';

import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
   })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private apiUrl = 'http://localhost:8080/api/users';

  http = inject(HttpClient);

  getUsers()  {
    return this.http.get<User[]>(this.apiUrl).pipe(catchError((this.handleError)));
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }

  private handleError (error: any) {
    console.log('server error:', error);
    return throwError(() => new Error('server error'));
  };
}
