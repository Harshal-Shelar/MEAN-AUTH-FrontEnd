import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  getUserId: any;
  updateUserForm !: FormGroup;
  deleteName: any;
  openPopup: any;
  selectedUser: any;
  deleteUserName: any;
  formInvalid : any = false;
  isChecked : any = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      salary: [null, Validators.required],
      empId: [null, Validators.required],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      userId: JSON.parse(localStorage.getItem('user_id') || '{}')._id
    });

    this.getUserId = this.route.snapshot.params['id'];
    this.getUser();
  }

  updateForm() {
    if (this.updateUserForm.valid) {
      this.apiService.editUser(this.getUserId, this.updateUserForm.value).subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/listUser')
        } else {
          this.formInvalid = true;
        }
      });
    }
  }

  async getUser() {
    await this.apiService.getUser(this.getUserId).subscribe(result => {

      this.deleteName = result.name;
      this.updateUserForm.patchValue({
        name: result.name,
        email: result.email,
        phoneNumber: result.phoneNumber,
        address: result.address,
        salary: result.salary,
        empId: result.empId,
        startDate: result.startDate,
        endDate: result.endDate,
        userId: result.userId
      });
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.updateUserForm.controls[controlName].hasError(errorName);
  }

  deleteUser() {
    this.apiService.deleteUser(this.selectedUser).subscribe((data) => {
      if (data) {
        this.openPopup = false;
        this.router.navigateByUrl('/listUser')
      }
    })
  }

  selectUser(getUserId: any) {
    this.selectedUser = getUserId;
    this.openPopup = true;
    this.sharedService.setData(true);
    this.deleteUserName = this.updateUserForm.value.name;
  }

  closePopup(){
    this.openPopup = false;
    this.sharedService.setData(false);
  }

  changed(evt:any) {
    this.isChecked = evt.target.checked;
    console.log(evt.target.checked);
  }
}
