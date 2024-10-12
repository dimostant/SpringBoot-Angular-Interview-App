import { Component, inject  } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-display',
  standalone: true,
  imports: [
    CommonModule, //common module?
  ],
  templateUrl: './users-display.component.html',
  styleUrl: './users-display.component.scss'
})
export class UsersDisplayComponent {
  userService = inject(UserService);
  router = inject(Router);

  users: User[] = [];

  constructor() {
    this.setArray();
  }

  onEdit(id: number | null) {
    this.router.navigate(['UserForm'], { queryParams: { id: id } });
  }

  onDelete(id: number | null) {
    if (id != null) {
      this.userService.deleteUser(id).subscribe((res: any) => {
        if(res.result) {
          this.setArray(); //reset 
          alert("User deleted successfully");
        } else {
          alert(res.message);
        }
      });
    }
  }

  setArray(){
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
