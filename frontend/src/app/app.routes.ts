import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { app } from '../../server';
import { AppComponent } from './app.component';


export const routes: Routes = [
    { path: 'UserForm', component: UserFormComponent },
    { path: 'UsersDisplay', component: UsersDisplayComponent },
    //{ path: '', component: AppComponent }
];
