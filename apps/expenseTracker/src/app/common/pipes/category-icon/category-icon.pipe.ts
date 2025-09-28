import { Pipe, PipeTransform } from '@angular/core';
import { categoryStyle } from '../../constants/category-keys.constants';
import { LucideIconData } from 'lucide-angular';

@Pipe({
  name: 'categoryIcon',
})
export class CategoryIconPipe implements PipeTransform {
  transform(value: string): LucideIconData {
    return categoryStyle[value as keyof typeof categoryStyle].icon;
  }
}
