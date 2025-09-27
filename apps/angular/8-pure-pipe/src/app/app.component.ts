import { Component } from '@angular/core';
import { NameIndexPipe } from './pipe/name-index';

@Component({
  selector: 'app-root',
  template: `
    @for (person of persons; track person) {
      {{ person | nameindex: $index }}
    }
  `,
  imports: [NameIndexPipe],
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
