import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
    })
  }

  login(){
    this.authService.loginService(this.loginForm.value).subscribe({
      next : (res)=>{
        alert("Login Successfull");
        localStorage.setItem("user_id", res.data._id);
        this.loginForm.reset();
        this.authService.isLoggedIn$.next(true);
        this.router.navigateByUrl('/home')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
