import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public change: EventEmitter<any> = new EventEmitter();
  constructor() { }

  public setData(value:any) {

    this.change.emit(value);
}
}
