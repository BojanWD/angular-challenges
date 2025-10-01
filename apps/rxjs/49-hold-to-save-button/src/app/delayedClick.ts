import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  delay,
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';

@Directive({
  selector: '[appDelayedClick]',
})
export class DelayedClickDirective {
  @Input() holdTime = 2000;
  @Output() progressChange = new EventEmitter<number>();
  @Output() clickFinalized = new EventEmitter<void>();

  progress = signal(0);

  private el = inject(ElementRef);
  constructor() {
    const el = this.el.nativeElement;
    const mousedown$ = fromEvent<MouseEvent>(el, 'mousedown');
    const mouseup$ = fromEvent<MouseEvent>(el, 'mouseup');
    const leave$ = fromEvent<MouseEvent>(el, 'mouseleave');
    const cancel$ = merge(mouseup$, leave$).pipe(
      tap(() => this.changeProgress(0)),
    );

    mousedown$
      .pipe(
        switchMap(() => {
          const start = Date.now();
          return interval(10).pipe(
            map(() => Date.now() - start),
            map((elapsed) => Math.min((elapsed / this.holdTime) * 100, 100)),
            takeWhile((p) => p < 100, true),
            takeUntil(cancel$),
            tap((p) => {
              this.changeProgress(p);
            }),
            filter((p) => {
              return p >= 100;
            }),
            tap(() => this.clickFinalized.emit()),
            delay(300),
            tap(() => this.changeProgress(0)),
            takeUntilDestroyed(),
          );
        }),
      )
      .subscribe();
  }

  private changeProgress(v: number) {
    this.progress.set(v);
    this.progressChange.emit(v);
  }
}
