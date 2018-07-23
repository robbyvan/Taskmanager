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
import * as fromTask from './task.reducer';
import * as fromUser from './user.reducer';

import { Auth } from '../domain/auth.model';
import { environment } from '../../environments/environment';


export interface State {
  quote: fromQuote.State;
  auth: Auth;
  projects: fromProject.State;
  taskLists: fromTaskList.State;
  tasks: fromTask.State;
  users: fromUser.State;
};

const initialState: State = {
  quote: fromQuote.initialState,
  auth: fromAuth.initialState,
  projects: fromProject.initialState,
  taskLists: fromTaskList.initialState,
  tasks: fromTask.initialState,
  users: fromUser.initialState
};

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState = (state: State) => state.projects;
export const getTaskListState = (state: State) => state.taskLists;
export const getTaskState = (state: State) => state.tasks;
export const getUserState = (state: State) => state.users;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListState, fromTaskList.getSelected);
export const getTasks = createSelector(getTaskState, fromTask.getTasks);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities);

export const getTasksWithOwners = createSelector(
  getTasks,
  getUserEntities,
  (tasks, userEntities) => 
    tasks.map(task =>  ({
          ...task, 
          owner: userEntities[task.ownerId], 
          participants: task.participantsIds.map(id => userEntities[id]),
          })
    )
  );

export const getTasksByLists = createSelector(
  getTaskLists,
  getTasksWithOwners,
  (lists, tasks) => lists.map(list => ({
    ...list,
    tasks: tasks.filter(task => task.taskListId === list.id)
  })));

export const getProjectUsers = (projectId: string) =>
  createSelector(
    getProjectState,
    getUserEntities,
    (state, entities) => state.entities[projectId].members.map(id => entities[id])
  );

export const reducers: ActionReducerMap<State> = {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  projects: fromProject.reducer,
  taskLists: fromTaskList.reducer,
  tasks: fromTask.reducer,
  users: fromUser.reducer
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