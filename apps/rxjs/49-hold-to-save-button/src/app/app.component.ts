import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DelayedClickDirective } from './delayedClick';

@Component({
  imports: [DelayedClickDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          appDelayedClick
          [holdTime]="1000"
          (progressChange)="handleProgressUpdate($event)"
          (clickFinalized)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="progress()" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress = signal(0);

  handleProgressUpdate(value: number) {
    this.progress.set(value);
  }

  onSend() {
    console.log('Action triggered!');
    alert('Action triggered!');
  }
}
