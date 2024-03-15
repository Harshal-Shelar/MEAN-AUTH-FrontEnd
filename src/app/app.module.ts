import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetComponent } from './pages/reset/reset.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HistoryComponent } from './components/history/history.component';
import { RegisterDetailsComponent } from './components/register-details/register-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    ForgetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    HistoryComponent,
    RegisterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
