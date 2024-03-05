import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  getUserId: any;
  updateUserForm !: FormGroup;
  deleteName: any;
  openPopup : any;
  selectedUser: any;
  deleteUserName : any;

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
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
          console.log("successfull");
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
        userId : result.userId
      });
    });

  }

  deleteUser(){
    this.apiService.deleteUser(this.selectedUser).subscribe((data)=>{
      if(data){
        this.openPopup = false;
        this.router.navigateByUrl('/listUser')
      }
    })
  }

  selectUser(getUserId : any) {
    this.selectedUser = getUserId;
    this.openPopup = true;
    this.deleteUserName = this.updateUserForm.value.name; 
    console.log(this.deleteUserName);
    
  }

}
