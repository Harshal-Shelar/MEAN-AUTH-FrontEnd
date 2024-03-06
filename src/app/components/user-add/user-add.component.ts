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

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      empId: [null, [Validators.required]],
      userId: JSON.parse(localStorage.getItem('user_id') || '{}')._id
    })
  }

  submitForm() {

    if (this.userForm.valid) {
      this.apiService.addUser(this.userForm.value).subscribe((data) => {
        console.log(data);
      });
      this.router.navigateByUrl('/listUser');
      this.userForm.reset();
    } else {
      console.log("Error While Submitting Form");
    }
  }
}
