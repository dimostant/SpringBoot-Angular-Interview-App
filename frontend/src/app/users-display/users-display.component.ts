import { Component, inject  } from '@angular/core';

import { CommonModule } from '@angular/common';
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
  $users = this.postService.getUsers();

  onEdit() {

  }

  onDelete() { //id: number) {

  }
}
