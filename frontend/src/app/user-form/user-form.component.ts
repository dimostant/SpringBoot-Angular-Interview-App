import { Component, inject  } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  userService = inject(UserService);
  router = inject(Router);

  userObj: User = new User( null, '', '', 'M', '', '', '');
  userList: User[] = [];
  userForm: FormGroup = new FormGroup({});  

  isEdit = false;
  maxDate = new Date().toISOString().split('T')[0];
  dropdownOptions = ['M', 'F'];

  constructor(private route: ActivatedRoute) {
    this.createForm();
    this.route.queryParams.subscribe(params => {
      if (params['id'] != undefined && params['id'] != null && params['id'] !== '') {
        const id = params['id'];
        this.isEdit = true;
        this.userService.getUser(id)
        .subscribe({
          next: (data) => {
        if(data) {
          this.userObj = data;
          this.createForm();
        }
          }, 
          error: (error) => {
          console.log(error);
          }
        });
      } else {
        this.onReset();
      }
    });
  }

  createForm() {
    this.userForm = new FormGroup({
      id:           new FormControl(this.userObj.id),
      name:         new FormControl(this.userObj.name,         [Validators.required]),
      surname:      new FormControl(this.userObj.surname,      [Validators.required]),
      gender:       new FormControl(this.userObj.gender,       [Validators.required]),
      birthDate:    new FormControl(this.userObj.birthDate,    [Validators.required]),
      workAddress:  new FormControl(this.userObj.workAddress),
      homeAddress:  new FormControl(this.userObj.homeAddress)
    });
  }
  
  onSave() {
    this.userObj = this.userForm.value;
    this.userService.createUser(this.userObj)
    .subscribe((res: any) => {
      if(res.result) {
        this.onReset();
        console.log(this.userObj)
        alert("User added successfully");
      } else {
        alert(res.message);
      }
    });
  }
  
  onUpdate() {
    this.userObj = this.userForm.value;
    this.userService.updateUser(this.userObj)
    .subscribe((res: any) => {
      if(res.result) {
        this.onReset();
        this.router.navigate(['UsersDisplay']);
        //alert("User added successfully");
      } else {
        alert(res.message);
      }
    });
  }

  onReset() {
    this.userObj  = new User( null, '', '', 'M', '', '', '');
    this.createForm();
  }

}
