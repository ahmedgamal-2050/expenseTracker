import { Pipe, PipeTransform } from '@angular/core';
import { categoryStyle } from '../../constants/category-keys.constants';

@Pipe({
  name: 'categoryStyle',
})
export class CategoryStylePipe implements PipeTransform {
  transform(value: string): string {
    return categoryStyle[value as keyof typeof categoryStyle].style;
  }
}
