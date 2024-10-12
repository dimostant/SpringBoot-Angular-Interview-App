import { Component, inject  } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';

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
  postService = inject(UserService);

  users: User[] = [];

  constructor() {
    this.postService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onEdit() {

  }

  onDelete(id: number | null) {
    if (id != null) {
      this.postService.deleteUser(id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
