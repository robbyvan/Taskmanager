import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from './quote.services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
      ],
    }
  }
}
