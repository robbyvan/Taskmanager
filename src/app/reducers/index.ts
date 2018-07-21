import { NgModule } from '@angular/core';
import { StoreModule, Store, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as fromQuote from './quote.reducer';
import { environment } from '../../environments/environment';


export interface State {
  quote: fromQuote.State;
};

const initialState: State = {
  quote: fromQuote.initialState,
};

export const getQuoteState = (state: State) => state.quote;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

export const reducers: ActionReducerMap<State> = {
  quote: fromQuote.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [ ],
  imports: [
    StoreModule.forRoot(reducers, {
      initialState: { ...initialState },
      metaReducers,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ]
})
export class AppStoreModule {

}