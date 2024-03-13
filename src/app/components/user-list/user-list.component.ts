import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: any = [];
  searchText: any;
  openPopup: any;
  selectedUser: any;
  deleteUserName: any;
  totalEmp: any;
  dept: any = [];
  deptList: any = [];
  count: number = 0;
  page: number = 1;
  tableSize: number = 6;
  tableSizes: any = [6, 12, 18, 24];
  duplicates: any = [];
  openHistory : any;

  constructor(private apiService: ApiService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getAllUsers().subscribe(async (data) => {
      this.userList = await data.reverse();
      this.totalEmp = data.length;

      this.userList.map((item: any) => {
        this.duplicates.push("All")
        this.duplicates.push(item.salary);

        this.deptList = [...new Set(this.duplicates)];
      })
    })
  }

  deleteUser() {
    this.apiService.deleteUser(this.selectedUser._id).subscribe((data) => {
      if (data) {
        this.getUserList();

        let deletedData = {
          name: this.selectedUser.name,
            operation: 'Deleted',
            userId: JSON.parse(localStorage.getItem('user_id') || '{}')._id,
            empId: this.selectedUser.empId,
            date: new Date()
        }
        
        this.apiService.addHistory(deletedData).subscribe((item) => {
          console.log(item);
        });
        this.openPopup = false;
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

  selectUser(user: any) {
    this.selectedUser = user;
    this.openPopup = true;
    this.sharedService.setData(true);
    this.deleteUserName = user.name;
  }

  closePopup() {
    this.openPopup = false;
    this.sharedService.setData(false);
  }

  onItemChange(value: any) {
    let newValue = value.target.value;

    this.dept = [];
    if (newValue !== 'All') {
      this.apiService.getAllUsers().subscribe(async (data) => {
        await data.map((item: any) => {
          if (item.salary === newValue) {
            this.dept.push(item)
            this.userList = this.dept;
            this.totalEmp = this.userList.length;
          }
        })
      })
    } else {
      this.getUserList()
    }
  }

  selectChangeHandler(event: any) {
    console.log(event.target.value);
  }

  openHistoryFun(){
    this.sharedService.setData(true);
    this.openHistory = true;
  }

  closeHistory(){
    this.sharedService.setData(false);
    this.openHistory = false;
  }
}
