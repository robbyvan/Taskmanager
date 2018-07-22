import { NgModule } from '@angular/core';
import { StoreModule, Store, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';

import { Auth } from '../domain/auth.model';
import { Project } from '../domain/project.model';

import { environment } from '../../environments/environment';


export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
  taskLists: fromTaskList.State;
};

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState,
  taskLists: fromTaskList.initialState,
};

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getTaskListState = (state: State) => state.taskLists;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);

export const reducers: ActionReducerMap<State> = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  taskLists: fromTaskList.reducer,
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