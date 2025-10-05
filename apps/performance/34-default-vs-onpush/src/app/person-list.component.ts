import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { ListInputComponent } from './list-input.component';
import { Listomponent } from './list.component';

@Component({
  selector: 'app-person-list',
  imports: [TitleCasePipe, ListInputComponent, Listomponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="text-center font-semibold" title="Title">
      {{ title() | titlecase }}
    </h1>

    <app-list-input (labelChanged)="namesUpdated.emit($event)" />

    <app-list [names]="names()" />
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Output() namesUpdated = new EventEmitter<string>();
  names = input<string[]>([]);
  title = input('');

  label = '';
}
