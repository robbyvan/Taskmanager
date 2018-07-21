import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './router.effects';
import { QuoteEffects } from './quote.effects';
import { AuthEffects } from './auth.effects';

@NgModule({
  imports: [ EffectsModule.forRoot([RouterEffects, QuoteEffects, AuthEffects]) ],
})
export class AppEffectsModule{ }