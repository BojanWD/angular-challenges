import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-input',
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  host: {
    class: 'contents',
  },
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CDFlashingDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListInputComponent {
  @Output() labelChanged = new EventEmitter<string>();
  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.labelChanged.emit(this.label);
      this.label = '';
    }
  }
}
