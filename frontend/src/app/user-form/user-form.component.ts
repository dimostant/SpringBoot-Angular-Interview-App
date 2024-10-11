import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';

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
  
  constructor() {
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      id:           new FormControl(this.userObj.id),
      name:         new FormControl(this.userObj.name, [Validators.required]),
      surname:      new FormControl(this.userObj.surname,[Validators.required]),
      gender:       new FormControl(this.userObj.gender),
      birthDate:    new FormControl(this.userObj.birthDate,[Validators.required]),
      workAddress:  new FormControl(this.userObj.workAddress,[Validators.required]),
      homeAddress:  new FormControl(this.userObj.homeAddress)
    });
  }
  
  onSave() {
    const oldData = localStorage.getItem('userData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.userForm.controls['id'].setValue(parseData.length + 1);
      this.userList.unshift(this.userForm.value);
    } else {
      this.userList.unshift(this.userForm.value);
    }
    localStorage.setItem('userData', JSON.stringify(this.userList));
    this.onReset();
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
    this.userObj = new User( null, '', '', '', new Date(), '', '');
    this.createForm();
  }

  onReset() {
    this.userObj = new User( null, '', '', '', new Date(), '', '');
    this.createForm();
  }


}
