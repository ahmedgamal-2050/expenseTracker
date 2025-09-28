import { Pipe, PipeTransform } from '@angular/core';
import { CategoryOptions } from '../../constants/category-keys.constants';
import { LucideIconData } from 'lucide-angular';

@Pipe({
  name: 'categoryOption',
})
export class CategoryOptionPipe implements PipeTransform {
  transform(value: string): {
    style: string;
    icon: LucideIconData;
    label: string;
  } {
    return CategoryOptions[value as keyof typeof CategoryOptions];
  }
}
