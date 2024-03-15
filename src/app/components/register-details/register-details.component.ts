import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password.validators';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss']
})
export class RegisterDetailsComponent implements OnInit {

  isChecked: any = false;
  regDetails: any;
  regUpdateForm !: FormGroup;
  getUserId: any;
  formInvalid: any;
  openRegPopup: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

    this.regUpdateForm = this.fb.group({
      firstName: [null, Validators.required],
      userName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      }
    );

    this.regDetails = JSON.parse(localStorage.getItem('user_id') || '{}');
    // console.log(this.regDetails);

    this.getUserId = this.regDetails._id;
    this.getUser()

  }

  changed(evt: any) {
    this.isChecked = evt.target.checked;
  }

  updateDetails() {
    if (this.regUpdateForm.valid) {
      this.authService.editRegDetails(this.getUserId, this.regUpdateForm.value).subscribe(result => {
        if (result) {
          let newName = (<any>result).updatedData.firstName;
          // console.log(newName);
          localStorage.setItem('newUserName', JSON.stringify(newName));

          console.log(JSON.parse(localStorage.getItem('newUserName') || '{}'));
          
          this.sharedService.setData(false);
          this.router.navigateByUrl('/listUser').then(()=>{
            window.location.reload()
          });
        } else {
          this.formInvalid = true;
        }
      });
    }
  }

  async getUser() {
    await this.authService.getRegUserId(this.getUserId).subscribe((result: any) => {

      this.regUpdateForm.patchValue({
        firstName: result.firstName,
        email: result.email,
        userName: result.userName,
        password: result.password,
        confirmPassword: result.password
      });
    });
  }

  openPopup() {
    this.sharedService.setData(true);
    this.openRegPopup = true;
  }

  closePopup() {
    this.sharedService.setData(false);
    this.openRegPopup = false;
  }
}
