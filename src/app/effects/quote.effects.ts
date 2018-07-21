import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as actions from '../actions/quote.action';
import { QuoteService } from '../services/quote.services';
import { QuoteActions } from '../actions/quote.action';

@Injectable()
export class QuoteEffects {
  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType<QuoteActions>(actions.ActionTypes.LOAD)
    .map(a => a.payload)
    .switchMap(_ => this.service$.getQuote()
      .map(q => new actions.LoadSuccessAction(q))
      .catch(err => of(new actions.LoadFailAction(JSON.stringify(err))))
    );

  constructor(private actions$: Actions, private service$: QuoteService) { }
}