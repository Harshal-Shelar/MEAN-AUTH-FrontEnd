import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm !: FormGroup;
  formInvalid: any = false;
  allEmails : any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      empId: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      userId: JSON.parse(localStorage.getItem('user_id') || '{}')._id
    })

  }

  submitForm() {

    if (this.userForm.valid) {
      this.apiService.addUser(this.userForm.value).subscribe((data) => {
        
        let historyData = {
          name: data.result.name,
          operation: 'Added',
          userId: JSON.parse(localStorage.getItem('user_id') || '{}')._id,
          empId: data.result._id,
          date: new Date()
        }

        if (data) {
          this.apiService.addHistory(historyData).subscribe((item) => {
            console.log(item);
          })
        }
      });
      this.router.navigateByUrl('/listUser');
      this.userForm.reset();


    } else {
      this.formInvalid = true;
      console.log("Error While Submitting Form");
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  resetValue() {
    this.userForm.reset();
  }
}
