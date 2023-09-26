import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetForm !: FormGroup;
  token !: string;

  constructor(
    private fb : FormBuilder, 
    private activatedRoute : ActivatedRoute, 
    private router : Router,
    private authService : AuthService
    ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password : ['', Validators.required],
      confirmPassword : ['', Validators.required],
    },
    {
      validator : confirmPasswordValidator('password','confirmPassword')
    });

    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token);
    })
  }

  reset(){
    let resetObj = {
      token : this.token,
      password : this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj).subscribe({
      next:(res)=>{
        alert(res.message);
        this.resetForm.reset();
        this.router.navigateByUrl('/login');
      },
      error:(err)=>{
        alert(err.error);
      }
    })
  }

}
