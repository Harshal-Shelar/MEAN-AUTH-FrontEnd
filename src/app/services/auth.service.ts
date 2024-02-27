import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.registerApi;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedInn : any;

  constructor(private http : HttpClient) { }

  registerService(data:any){
    return this.http.post<any>(`${this.baseUrl}/register`, data)
  }

  loginService(data:any){
    return this.http.post<any>(`${this.baseUrl}/login`, data)
  }

  sendEmailService(data:any){
    return this.http.post<any>(`${this.baseUrl}/send-email`, data)
  }

  resetPasswordService(data:any){
    return this.http.post<any>(`${this.baseUrl}/reset-password`, data)
  }

  isLoggedIn(){
    return !!localStorage.getItem("user_id");
  }

  isAuthenticated() {
    if(localStorage.getItem('user_id')){
      this.isLoggedInn = true;
    }else{
      this.isLoggedInn = false;
    }
    return this.isLoggedInn;
  }
}
