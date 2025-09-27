import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card-row/card-row-directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" class="bg-light-red" (addItem)="addCity()">
      <img ngSrc="assets/img/city.png" width="200" height="200" priority />
      <ng-template [cardRow]="cities()" let-item>
        <app-list-item (delete)="deleteCity(item.id)">
          <div class="flex gap-1">
            <div>{{ item.name }} -</div>
            <div>{{ item.country }}</div>
          </div>
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    CardRowDirective,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
