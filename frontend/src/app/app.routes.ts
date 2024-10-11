import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersDisplayComponent } from './users-display/users-display.component';


export const routes: Routes = [
    { path: 'UserForm', component: UserFormComponent },
    { path: 'UsersDisplay', component: UsersDisplayComponent },
];
