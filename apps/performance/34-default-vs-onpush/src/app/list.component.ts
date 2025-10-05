import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-list',
  template: `
    <mat-list class="flex w-full">
      @if (names().length === 0) {
        <div class="empty-list-label">Empty list</div>
      }
      @for (name of names(); track name) {
        <mat-list-item cd-flash class="text-orange-500">
          <div class="flex justify-between">
            <h3 title="Name">
              {{ name }}
            </h3>
          </div>
        </mat-list-item>
      }
      @if (names().length !== 0) {
        <mat-divider></mat-divider>
      }
    </mat-list>
  `,
  host: {
    class: 'contents',
  },
  imports: [CDFlashingDirective, MatListModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Listomponent {
  names = input<string[]>([]);
}
