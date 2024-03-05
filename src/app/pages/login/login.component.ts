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
  hideLogin : any = true;
  
  constructor(private formBuilder: FormBuilder, 
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
    });

    if(localStorage.getItem('user_id')){
      this.hideLogin = false;
    }
  }

  login(){
    this.authService.loginService(this.loginForm.value).subscribe({
      next : (res)=>{
        
        localStorage.setItem("user_id", JSON.stringify(res.data));
        this.loginForm.reset();
        this.authService.isLoggedIn$.next(true);
        this.router.navigateByUrl('/listUser')
        .then(()=>{
          window.location.reload();
        })
      },
      error:(err)=>{
        alert("Wrong Login Credentials");
        console.log(err);
      }
    })
  }
}
