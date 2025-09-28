import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  EventEmitter,
  input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { CardRowDirective } from '../card-row/card-row-directive';

@Component({
  selector: 'app-card',
  template: `
    <ng-container
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content />

      <section>
        @for (item of list(); track item) {
          <ng-container
            *ngTemplateOutlet="rowTemplate(); context: { $implicit: item }" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </ng-container>
  `,
  imports: [NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  @Output() addItem: EventEmitter<void> = new EventEmitter();
  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });
  readonly list = input<T[] | null>(null);

  CardType = CardType;

  addNewItem() {
    this.addItem.emit();
  }
}
