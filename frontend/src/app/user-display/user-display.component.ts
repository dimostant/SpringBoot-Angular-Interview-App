import { Component, inject } from '@angular/core';
import { User } from '../class/user';

import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-display',
  standalone: true,
  imports: [],
  templateUrl: './user-display.component.html',
  styleUrl: './user-display.component.scss'
})
export class UserDisplayComponent {

  user: User | null = null;

  userService = inject(UserService);  
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.setUser();
    this.route.queryParams.subscribe(params => {
      if (params['id'] != undefined && params['id'] != null && params['id'] !== '') {
        const id = params['id'];
        this.userService.getUser(id)
        .subscribe({
          next: (data) => {
            if(data) {
              this.user = data;
            }
          }, 
          error: (error) => { console.log(error); }
        });
      }
    });
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
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert("User deleted successfully");
          this.router.navigate(['UsersDisplay']);
        },
        error: (error) => {  console.log(error); },
    });
    }

  }

  setUser() {
    if (this.user && this.user.id != null) {
      this.userService.getUser(this.user.id).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => { console.log(error); }
      });
    }
  }

  reloadPage() {
    window.location.reload()
  }
}
