import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
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

}
