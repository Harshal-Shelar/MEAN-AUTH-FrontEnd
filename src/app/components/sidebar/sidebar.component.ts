import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar : any;
  closeBtn : any;
  searchBtn : any;
  dataRecieve : any;
  openPopup : any;

  sidebarList = [
    {name : 'Dashboard', router : '/listUser', icons : 'bx bx-grid-alt'},
    {name : 'Add Employee', router : '/addUser', icons : 'bx bx-user-plus'},
    {name : 'Departments', router : '/department', icons : 'bx bx-sitemap'},
    {name : 'History', router : '/history', icons : 'bx bx-share'},
    {name : 'Settings', router : '/registerDetails', icons : 'bx bx-cog'}
  ]

  constructor(private sharedService : SharedService) {}
  ngOnInit() {
    this.sidebar = document.querySelector('.sidebar');
    this.closeBtn = document.querySelector('#btn');
    this.searchBtn = document.querySelector('.bx-search');

    this.closeBtn.addEventListener('click', () => {
      this.sidebar.classList.toggle('open');
      menuBtnChange();
    });

    this.searchBtn.addEventListener('click', () => {
      this.sidebar.classList.toggle('open');
      menuBtnChange();
    });

    const menuBtnChange = () => {
      if (this.sidebar.classList.contains('open')) {
        this.closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        this.closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }

  getData() {
    this.sharedService.change.subscribe(value => {
      this.dataRecieve = value;
    });
  }

  logout(){
    localStorage.removeItem('user_id')
    window.location.reload();
  }

  closePopup(){
    this.openPopup = false;
    this.sharedService.setData(false);
  }

  openPopupFun(){
    this.openPopup = true;
    this.sharedService.setData(true);
  }
}
