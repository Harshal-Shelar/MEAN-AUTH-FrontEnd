import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;
  allRegEmail : any = [];

  constructor(
    private formBuilder: FormBuilder, 
    private authService : AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      userName : ['', Validators.required],
      phoneNumber : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
    },
    {
      validator : confirmPasswordValidator('password','confirmPassword')
    }
    )

    this.authService.getRegUser().subscribe((data)=>{
      data.map((item:any)=>{
        this.allRegEmail.push(item.email);
      })
    })
  }

  regiter(){
    let emailCheck = this.registerForm.value.email;

    if(this.allRegEmail.includes(emailCheck)){
      alert('Email Already exist in Database')
    }else{
      this.authService.registerService(this.registerForm.value).subscribe({
        next : (res)=>{
          
          alert("User created");
          this.registerForm.reset();
          this.router.navigateByUrl('/login')
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
