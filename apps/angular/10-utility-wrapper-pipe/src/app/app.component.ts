import { Component } from '@angular/core';
import { PersonUtils } from './person.utils';
import { UtilityWrapperPipe } from './pipe/utility-wrapper';

@Component({
  selector: 'app-root',
  template: `
    @for (activity of activities; track activity.name) {
      {{ activity.name }} :
      @for (
        person of persons;
        track person.name;
        let index = $index;
        let isFirst = $first
      ) {
        {{ 'showName' | utilityWrapper: person.name : index }}
        {{
          'isAllowed'
            | utilityWrapper: person.age : isFirst : activity.minimumAge
        }}
      }
    }
  `,
  imports: [UtilityWrapperPipe],
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];

  showName = PersonUtils.showName;

  isAllowed = PersonUtils.isAllowed;
}
