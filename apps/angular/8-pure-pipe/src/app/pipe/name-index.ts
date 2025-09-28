import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameindex',
})
export class NameIndexPipe implements PipeTransform {
  transform(value: string, index: number): unknown {
    return `${value} - ${index}`;
  }
}
