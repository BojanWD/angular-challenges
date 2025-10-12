import { Directive, inject, Input } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[currencyCode]',
  providers: [CurrencyService],
})
export class CurrencyCodeDirective {
  currencyService = inject(CurrencyService);

  @Input() set currencyCode(code: string) {
    this.currencyService.patchState({ code });
  }
}
