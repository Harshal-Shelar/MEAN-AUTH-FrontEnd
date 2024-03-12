import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historyData : any = [];
  id : any = "65f08bc0b8d99ca79fffcbd8";
  constructor(private apiService :ApiService, private sharedService: SharedService) { }

  ngOnInit(): void {

    this.apiService.getHistory().subscribe((item)=>{
      this.historyData = item.reverse();
    })
  }

  closeHistory(){
    this.sharedService.setData(false);
  }

}
