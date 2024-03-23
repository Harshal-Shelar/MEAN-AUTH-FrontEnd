import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  userList: any = [];
  dept: any = [];
  deptList: any = [];
  totalEmp: any;
  duplicates: any = [];
  openPopup : any;
  openDeletePopup : any;
  deptName : any;
  selectedUser: any;
  deleteUserName: any;

  constructor(private apiService: ApiService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getAllUsers().subscribe(async (data) => {
      this.userList = await data;
      this.totalEmp = data.length;

      this.userList.map((item: any) => {
        this.duplicates.push("All")
        this.duplicates.push(item.salary);

        this.deptList = [...new Set(this.duplicates)];
      })
    })
  }

  onItemChange(value: any) {
    this.openPopup = true;
    this.dept = [];
    if (value !== 'All') {
      this.apiService.getAllUsers().subscribe(async (data) => {
        await data.map((item: any) => {
          if (item.salary === value) {
            this.dept.push(item);
            this.deptName = value;
            this.userList = this.dept;
          }
        })
      })
    } else {
      this.getUserList()
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.openDeletePopup = true;
    this.sharedService.setData(true);
    this.deleteUserName = user.name;
  }

  deleteUser() {
    this.apiService.deleteUser(this.selectedUser._id).subscribe((data) => {
      if (data) {
        this.getUserList();
        this.openDeletePopup = false;
      }
    })
  }
}
