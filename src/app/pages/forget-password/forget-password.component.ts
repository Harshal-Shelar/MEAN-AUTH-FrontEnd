import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm !: FormGroup;
  constructor(private fb : FormBuilder, private authService : AuthService) { }

  ngOnInit(): void {

    this.forgetForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]]
    })
  }
  sendEmail(){
    this.authService.sendEmailService(this.forgetForm.value).subscribe({
      next : (res=>{
        alert("Mail sent successfuly");
        this.forgetForm.reset();
      })
    })
  }
}
