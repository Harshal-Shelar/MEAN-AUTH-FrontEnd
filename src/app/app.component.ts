import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavBar : any = false;

  ngOnInit(){
    if(localStorage.getItem('user_id')){
      this.showNavBar = true;
    }
  }
}
