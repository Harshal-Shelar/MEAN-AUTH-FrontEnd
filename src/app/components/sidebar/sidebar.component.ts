import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar : any;
  closeBtn : any;
  searchBtn : any;
  showNavBar : any = false;

  sidebarList = [
    {name : 'Dashboard', router : '/listUser', icons : 'bx bx-grid-alt'},
    {name : 'Add Employee', router : '/addUser', icons : 'bx bx-user-plus'},
    {name : 'Departments', router : '/department', icons : 'bx bx-sitemap'},
    {name : 'History', router : '/history', icons : 'bx bx-share'},
    {name : 'Settings', router : '/registerDetails', icons : 'bx bx-cog'},
    {name : 'Logout', icons : 'bx bx-log-in-circle'},
  ]

  constructor() {}
  ngOnInit() {
    if(localStorage.getItem('user_id')){
      this.showNavBar = true;
    }
    this.sidebar = document.querySelector('.sidebar');
    this.closeBtn = document.querySelector('#btn');
    this.searchBtn = document.querySelector('.bx-search');

    this.closeBtn.addEventListener('click', () => {
      this.sidebar.classList.toggle('open');
      menuBtnChange(); //calling the function(optional)
    });

    this.searchBtn.addEventListener('click', () => {
      // Sidebar open when you click on the search iocn
      this.sidebar.classList.toggle('open');
      menuBtnChange(); //calling the function(optional)
    });

    // following are the code to change sidebar button(optional)
    const menuBtnChange = () => {
      if (this.sidebar.classList.contains('open')) {
        this.closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
      } else {
        this.closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
      }
    }
  }

}
