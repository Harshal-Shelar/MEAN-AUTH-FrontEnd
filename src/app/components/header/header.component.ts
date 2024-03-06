import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  regLog: any = false;
  userDetails: any;
  dataRecieve : any;
  openPopup : any;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private sharedService : SharedService
    ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn();
    })
    this.getData();
    this.userDetails = JSON.parse(localStorage.getItem('user_id') || '{}').firstName;
  }

  logout() {
    localStorage.removeItem("user_id");
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
    this.authService.isLoggedIn$.next(false);
  }

  getData() {
    this.sharedService.change.subscribe(value => {
      this.dataRecieve = value;
    });
  }

  logoutFun(){
    this.openPopup = true;
    this.sharedService.setData(true);
  }

  closePopup(){
    this.openPopup = false;
    this.sharedService.setData(false);
  }
}
