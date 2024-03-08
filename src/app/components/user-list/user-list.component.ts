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
  searchText : any;
  openPopup: any;
  selectedUser: any;
  deleteUserName: any;
  totalEmp: any;
  dept : any = [];
  deptList : any = [];
  count : number = 0;
  page : number = 1;
  tableSize : number = 6;
  tableSizes : any = [6,12,18,24];
  duplicates : any =  [];

  constructor(private apiService: ApiService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getAllUsers().subscribe((data) => {
      this.userList = data.reverse();
      this.totalEmp = data.length;

      this.userList.map((item:any)=>{
        this.duplicates;
        this.duplicates.push('All');
        this.duplicates.push(item.salary);
        
        this.deptList = [...new Set(this.duplicates)];
      })
    })
  }

  deleteUser() {
    this.apiService.deleteUser(this.selectedUser._id).subscribe((data) => {
      if (data) {
        this.getUserList();
        this.openPopup = false;
      }
    })
  }

  onTableDataChange(event:any){
    this.page = event;
    this.getUserList();
  }

  onTableSizeChange(event:any){
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
    this.dept = [];
    if(value !== 'All'){
      this.apiService.getAllUsers().subscribe((data) => {
        data.map((item:any)=>{
          
          if(item.salary === value){
            this.dept.push(item)
            this.userList = this.dept;
            this.totalEmp = this.userList.length;
          }
        })
      })
    }else{
      this.getUserList()
    }
  }
}
