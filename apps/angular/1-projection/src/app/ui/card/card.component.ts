import { Component, EventEmitter, input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <ng-container
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content />

      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            [type]="type()"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-container>
  `,
  imports: [ListItemComponent],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent {
  @Output() addItem: EventEmitter<void> = new EventEmitter();

  readonly list = input<any[] | null>(null);
  readonly type = input.required<CardType>();

  CardType = CardType;

  addNewItem() {
    this.addItem.emit();
  }
}
