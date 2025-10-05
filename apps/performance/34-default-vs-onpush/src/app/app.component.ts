import { Component } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { PersonListComponent } from './person-list.component';
import { RandomComponent } from './random.component';

@Component({
  imports: [PersonListComponent, RandomComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person-list
        [names]="girlList"
        title="Female"
        (namesUpdated)="updateList($event, 'girlList')" />
      <app-person-list
        [names]="boyList"
        title="Male"
        (namesUpdated)="updateList($event, 'boyList')" />
    </div>
  `,
})
export class AppComponent {
  girlList = randFirstName({ gender: 'female', length: 10 });
  boyList = randFirstName({ gender: 'male', length: 10 });

  updateList(value: string, type: 'boyList' | 'girlList') {
    this[type] = [value, ...this[type]];
  }
}
