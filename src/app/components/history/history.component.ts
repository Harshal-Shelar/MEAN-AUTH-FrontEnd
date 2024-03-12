import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historyData : any = [];
  constructor(private apiService :ApiService) { }

  ngOnInit(): void {

    this.apiService.getHistory().subscribe((item)=>{
      console.log(item);
      this.historyData = item.reverse()
    })
  }

}
