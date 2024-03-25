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
  openPopup: any;
  openDeletePopup: any;
  deptName: any;
  selectedUser: any;
  deleteUserName: any;
  page: number = 1;
  tableSize: number = 5;
  count: number = 0;
  tableSizes: any = [5, 10, 15, 20];

  constructor(private apiService: ApiService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserList();
    this.countO()
  }

  countO() {

    let current = null;
    let cnt = 0;
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i] != current) {
        if (cnt > 0) {
          console.log(current + ' comes --> ' + cnt + ' times');
        }
        current = this.userList[i];
        
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      console.log(current + ' comes --> ' + cnt + ' times');
    }

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
      this.deptName = 'All';
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

  onTableDataChange(event: any) {
    this.page = event;
    this.getUserList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUserList();
  }
}
