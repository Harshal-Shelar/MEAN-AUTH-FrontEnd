import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList : any = [];
  searchText : any;
  openPopup : any;
  selectedUser: any;
  deleteUserName : any;

  constructor(private apiService : ApiService, private sharedService : SharedService) { }

  ngOnInit(): void {
    this.getUserList()
  }

  getUserList(){
    this.apiService.getAllUsers().subscribe((data)=>{
      this.userList = data;
    })
  }

  deleteUser(){
    this.apiService.deleteUser(this.selectedUser._id).subscribe((data)=>{
      if(data){
        this.getUserList();
        this.openPopup = false;
      }
    })
  }

  selectUser(user:any) {
    this.selectedUser = user;
    this.openPopup = true;
    this.sharedService.setData(true);
    this.deleteUserName = user.name; 
  }

  closePopup(){
    this.openPopup = false;
    this.sharedService.setData(false);
  }

}
