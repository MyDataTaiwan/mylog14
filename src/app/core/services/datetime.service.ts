import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  dateDelta(time: string | number | Date, delta: number) {
    const date = new Date(time);
    const epochTime = date.setDate(date.getDate() + delta);
    return this.toDateString(epochTime);
  }

  toDateString(time: string | number | Date) {
    return formatDate(time, 'yyyy-MM-dd', 'en-us');
  }
}
