import { Component, inject  } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  userObj: User = new User( null, '', '', '', new Date(), '', '');
  userList: User[] = [];
  userForm: FormGroup = new FormGroup({});  
  
  postService = inject(UserService);
  
  http = inject(HttpClient);

  constructor() {
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      id:           new FormControl(this.userObj.id),
      name:         new FormControl(this.userObj.name),//, [Validators.required]),
      surname:      new FormControl(this.userObj.surname),//, [Validators.required]),
      gender:       new FormControl(this.userObj.gender),
      birthDate:    new FormControl(this.userObj.birthDate),//, [Validators.required]),
      workAddress:  new FormControl(this.userObj.workAddress), //, [Validators.required]),
      homeAddress:  new FormControl(this.userObj.homeAddress)
    });
  }
  
  onSave() {
    const user = new User( null, 'mastoraaaas', 'giorgou', 'jynaika', new Date(), 'asdfas', 'fdsaf');
    this.postService.createUser(user)
    .subscribe((res: any) => {
      if(res.result) {
        this.onReset();
        alert("User added successfully");
      } else {
        alert(res.message);
      }
    });
    // const oldData = localStorage.getItem('userData');
    // if (oldData != null) {
    //   const parseData = JSON.parse(oldData);
    //   this.userForm.controls['id'].setValue(parseData.length + 1);
    //   this.userList.unshift(this.userForm.value);
    // } else {
    //   this.userList.unshift(this.userForm.value);
    // }
    // localStorage.setItem('userData', JSON.stringify(this.userList));
    // this.onReset();
  }

  onEdit(user: User) {
    this.userObj = user;
    this.createForm();
  }
  
  onUpdate() {
    const record = this.userList.find((x) => x.id == this.userForm.controls['id'].value);
    if (record != undefined) {
      record.name = this.userForm.controls['name'].value;
      record.surname = this.userForm.controls['surname'].value;
      //other fields
    }
    localStorage.setItem('userData', JSON.stringify(this.userList));
    this.onReset();
  }

  onReset() {
    this.userObj = new User( null, '', '', '', new Date(), '', '');
    this.createForm();
  }


}
