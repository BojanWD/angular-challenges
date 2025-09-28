import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from '../person.utils';

type PersonType = typeof PersonUtils;

@Pipe({
  name: 'utilityWrapper',
})
export class UtilityWrapperPipe implements PipeTransform {
  transform<T extends keyof PersonType>(
    key: T,
    ...args: Parameters<PersonType[T]>
  ) {
    const util = PersonUtils[key as keyof typeof PersonUtils] as Function;
    return util(...args);
  }
}
