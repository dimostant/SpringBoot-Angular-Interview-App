import { Component, inject  } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { User } from '../class/user';
import { UserService } from '../service/user.service';
import { Address } from '../class/address';

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

  userObj: User = new User( null, '', '', 'M', '', new Address(null, '', ''));
  userList: User[] = [];
  userForm: FormGroup = new FormGroup({});  

  maxDate = new Date().toISOString().split('T')[0];
  dropdownOptions = ['M', 'F'];

  constructor(private route: ActivatedRoute) {
    this.createForm();
    this.route.queryParams.subscribe(params => {
      if (params['id'] != undefined && params['id'] != null && params['id'] !== '') {
        const id = params['id'];
        this.userService.getUser(id)
        .subscribe({
          next: (data) => {
            if(data) {
              this.userObj = data;
              this.createForm();
            }
          }, 
          error: (error) => { console.log(error); }
        });
      } else { this.onReset(); }
    });
  }

  createForm() {
    this.userForm = new FormGroup({
      id:           new FormControl(this.userObj.id),
      name:         new FormControl(this.userObj.name,         [Validators.required]),
      surname:      new FormControl(this.userObj.surname,      [Validators.required]),
      gender:       new FormControl(this.userObj.gender,       [Validators.required]),
      birthDate:    new FormControl(this.userObj.birthDate,    [Validators.required]),
      address:      new FormGroup  ({
          id:           new FormControl(this.userObj.address.id),
          workAddress:  new FormControl(this.userObj.address.workAddress),
          homeAddress:  new FormControl(this.userObj.address.homeAddress),
      }),
    });
  }
    
  onSave() {
    this.userObj = this.userForm.value;
    this.userService.createUser(this.userObj)
    .subscribe({
      next: () => {
        this.onReset();
        alert("User added successfully");
      },
      error: (error) => { console.log(error); }
    });
  }
  
  onUpdate() {
    this.userObj = this.userForm.value;
    this.userService.updateUser(this.userObj)
    .subscribe({
      next: () => {
        this.onReset();
        alert("User added successfully");
        this.router.navigate(['UsersDisplay']);
      },
      error: (error) => { console.log(error); }
    });
  }

  onReset() {
    this.userObj  = new User( null, '', '', 'M', '', new Address(null, '', ''));
    this.createForm();
  }

}
