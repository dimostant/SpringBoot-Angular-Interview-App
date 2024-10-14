import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { UserDisplayComponent } from './components/user-display/user-display.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { path: 'UserForm', component: UserFormComponent },
    { path: 'UsersDisplay', component: UsersDisplayComponent },
    { path: 'UserDisplay', component: UserDisplayComponent },
    { path: '', component: HomeComponent }
];
