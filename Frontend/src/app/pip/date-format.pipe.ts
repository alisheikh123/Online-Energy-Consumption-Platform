import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(public datepipe: DatePipe){}
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
    convertToFormat(date:any){

      return moment(date).toISOString();
     }
  }

