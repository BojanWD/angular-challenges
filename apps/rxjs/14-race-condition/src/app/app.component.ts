import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, startWith, tap } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    @if (topics$ | async; as topics) {
      <button [disabled]="!topics?.length" (click)="openTopicModal(topics)">
        Open Topic
      </button>
    }
  `,
  imports: [AsyncPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$: Observable<TopicType[]> = this.topicService.fakeGetHttpTopic().pipe(
    startWith([]),
    tap((v) => console.log(v)),
  );

  openTopicModal(topics: TopicType[]) {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics: topics,
      },
    });
  }
}
