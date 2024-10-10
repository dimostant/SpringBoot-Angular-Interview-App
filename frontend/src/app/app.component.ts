import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule], //common module?
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EDfrontend';
  
  postService = inject(UserService);
  $users = this.postService.getUsers();


  userForm: FormGroup = new FormGroup({});
  
  userObj: User = new User(
    null,
    '',
    '',
    '',
    new Date(),
    '',
    ''
  );
  userList: User[] = [];

  constructor() {
    this.createForm();
    if (this.isLocalStorageAvailable()) {
      const oldData = localStorage.getItem('userData');
      if (oldData != null) {
       const parseData = JSON.parse(oldData);
       this.userList = parseData;
      }
    }
  }

  // ngOnInit(): void {}

  isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'testValue');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  createForm() {
    this.userForm = new FormGroup({
      id:           new FormControl(this.userObj.id),
      name:         new FormControl(this.userObj.name),
      surname:      new FormControl(this.userObj.surname),
      gender:       new FormControl(this.userObj.gender),
      birthDate:    new FormControl(this.userObj.birthDate),
      workAddress:  new FormControl(this.userObj.workAddress),
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
  }

  onEdit(user: User) {
    // this.userForm = user;
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
    // this.userForm = new User();
    this.createForm();
  }

  onDelete(user: User){ //id: number) {
    // const isDelete = confirm('Are you sure you want to delete?');
    // if (isDelete) {
    //   const index = this.userList.findIndex((x) => x.id == id);
    //   this.userList.splice(index,1)
    //   localStorage.setItem('userData', JSON.stringify(this.userList));
    // }
  }
}