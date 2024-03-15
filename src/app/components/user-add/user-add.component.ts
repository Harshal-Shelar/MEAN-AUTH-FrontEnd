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
  allEmails: any = [];
  emailExist : any;
  startDateNew : any;
  lastDateNew :any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: [null, [Validators.required]],
      salary: [null, [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
      empId: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      userId: JSON.parse(localStorage.getItem('user_id') || '{}')._id
    })

    this.apiService.getAllEmails().subscribe((items) => {
      items.map((data: any) => {
        this.allEmails.push(data.email);
      });
    })
  }

  get f(){
    return this.userForm.controls;  
  }

  submitForm() {

    let newEmail = this.userForm.value.email;

    this.startDateNew = new Date(this.userForm.value.startDate);
    this.lastDateNew = new Date(this.userForm.value.endDate);

    if(this.startDateNew > this.lastDateNew){
      this.formInvalid = true;
      alert('Start date must be less than End Date')
    }

    if (this.allEmails.includes(newEmail)) {
      this.emailExist = true;
      this.formInvalid = true;
    } else {
      this.formInvalid = false;

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
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  resetValue() {
    this.userForm.reset();
  }
}
