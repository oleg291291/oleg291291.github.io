import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moreThan25'
})
export class MoreThan25Pipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (+value > 25) {
      return `${value} (more than 25)`;
    }
    if (value === '25') {
      return value;
    }
    if (+value < 25) {
      return `${value} (less than 25)`;
    }
  }

}
