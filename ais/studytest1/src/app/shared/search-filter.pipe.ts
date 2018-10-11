import { Pipe, PipeTransform } from '@angular/core';
import { User } from './app.models';

@Pipe({
  name: 'occupationFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(users: User[], args?: any): any {
    if (!args) { return users; }
    return users.filter(user => user.userName.toLowerCase().indexOf(args.toLowerCase()) === 0);
  }

}
