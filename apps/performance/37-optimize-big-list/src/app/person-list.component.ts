import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  template: `
    <div class="relative h-[300px] overflow-hidden">
      <!-- <div > -->
      <cdk-virtual-scroll-viewport
        itemSize="36"
        class="absolute inset-0 overflow-scroll">
        <div
          *cdkVirtualFor="let person of persons()"
          class="flex h-9 items-center justify-between border-b">
          <h3>{{ person.name }}</h3>
          <p>{{ person.email }}</p>
        </div>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule],
})
export class PersonListComponent {
  persons = input<Person[]>();

  trackbyemail(index: number, item: Person) {
    console.log(index, item);
    return item.email;
  }
}
