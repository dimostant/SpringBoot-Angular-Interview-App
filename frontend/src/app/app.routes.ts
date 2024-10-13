import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: 'UserForm', component: UserFormComponent },
    { path: 'UsersDisplay', component: UsersDisplayComponent },
    { path: 'UserDisplay', component: UserDisplayComponent },
    { path: '', component: HomeComponent }
];
