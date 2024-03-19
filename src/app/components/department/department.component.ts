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

    this.dept = [];
    if (value !== 'All') {
      this.apiService.getAllUsers().subscribe(async (data) => {
        await data.map((item: any) => {
          if (item.salary === value) {
            this.dept.push(item)
            this.userList = this.dept;
            this.count(this.userList);
          }
        })
      })
    } else {
      this.getUserList()
    }
  }

  count(array:any) {

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] != current) {
            if (cnt > 0) {
                console.log(current + ' comes --> ' + cnt + ' times');
            }
            current = array[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        console.log(current + ' comes --> ' + cnt + ' times');
    }

}

}
