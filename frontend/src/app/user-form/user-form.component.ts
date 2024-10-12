import { Component, inject  } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.createForm();
    
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params['id'] != undefined) {
        const id = params['id'];
        this.postService.getUser(id)
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
      name:         new FormControl(this.userObj.name),//, [Validators.required]),
      surname:      new FormControl(this.userObj.surname),//, [Validators.required]),
      gender:       new FormControl(this.userObj.gender),
      birthDate:    new FormControl(this.userObj.birthDate),//, [Validators.required]),
      workAddress:  new FormControl(this.userObj.workAddress), //, [Validators.required]),
      homeAddress:  new FormControl(this.userObj.homeAddress)
    });
  }
  
  onSave() {
    this.postService.createUser(this.userObj)
    .subscribe((res: any) => {
      if(res.result) {
        this.onReset();
        alert("User added successfully");
      } else {
        alert(res.message);
      }
    });
  }
  
  onUpdate() {
    const record = this.userList.find((x) => x.id == this.userForm.controls['id'].value);
    if (record != undefined) {
      record.name        = this.userForm.controls['name'].value;
      record.surname     = this.userForm.controls['surname'].value;
      record.gender      = this.userForm.controls['gender'].value;
      record.birthDate   = this.userForm.controls['birthDate'].value;
      record.workAddress = this.userForm.controls['workAddress'].value;
      record.homeAddress = this.userForm.controls['homeAddress'].value;
    }
    localStorage.setItem('userData', JSON.stringify(this.userList));
    this.onReset();
  }

  onReset() {
    this.userObj = new User( null, '', '', '', new Date(), '', '');
    this.createForm();
  }


}
