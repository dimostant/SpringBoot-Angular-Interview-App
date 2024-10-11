import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, //common module?
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    ReactiveFormsModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EDfrontend';
  
  // postService = inject(UserService);
  // $users = this.postService.getUsers();


  userForm: FormGroup = new FormGroup({});
  
  userObj: User = new User( null, '', '', '', new Date(), '', '');
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

  onDelete(id: number | null) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      const index = this.userList.findIndex((x) => x.id == id);
      this.userList.splice(index,1)
      localStorage.setItem('userData', JSON.stringify(this.userList));
    }
  }

  onReset() {
    this.userObj = new User( null, '', '', '', new Date(), '', '');
    this.createForm();
  }

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
}