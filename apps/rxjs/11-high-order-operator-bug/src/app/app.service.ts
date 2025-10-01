import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const infoByType = this.dbService.searchByType(type);
    return infoByType.length > 0
      ? forkJoin(
          infoByType.map((t) => this.dbService.deleteOneTopic(t.id)),
        ).pipe(
          switchMap((value) => {
            console.log(value);
            const allTrue = value.every(Boolean);
            return of(allTrue);
          }),
        )
      : of(true);
  }
}
