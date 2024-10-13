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

  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  totalPages: number = 0; 

  constructor() {
    this.setArray();
  }

  onEdit(id: number | null) {
    if (id != null && id != undefined) {
      this.router.navigate(['UserForm'], { queryParams: { id: id } });
    } 
    else {
      alert("This entry might be deleted or some internal error might have occured. Please try again later.");
    }
  }

  onDelete(id: number | null) {
    if (id != null) {
      this.userService.deleteUser(id).subscribe((res: any) => {
      //   if(res.result) {
      //     this.setArray(); //reset 
      //     alert("User deleted successfully");
      //   } else { alert(res.message); }
      });
    }
    alert("User deleted successfully");
    this.setArray();
    this.reloadPage();
  }

  setArray(){
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.setArray();
  }

  onView(id: number | null) {
    this.router.navigate(['UserDisplay'],{ queryParams: { id: id } });
  }

  reloadPage() {
    window.location.reload()
  }
}
