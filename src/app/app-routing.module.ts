import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { AuthGuard } from './gurads/auth.guard';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'listUser', pathMatch : 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addUser', component: UserAddComponent, canActivate: [AuthGuard] },
  { path: 'listUser', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'updateUser/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'reset/:token', component: ResetComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
