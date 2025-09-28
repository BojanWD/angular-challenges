import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
})
export class WrapFnPipe implements PipeTransform {
  transform<T extends (...args: any[]) => any>(
    value: T,
    ...args: Parameters<T>
  ): ReturnType<T> {
    return value(...args);
  }
}
