import * as _ from 'lodash';
import { createSelector } from 'reselect';

import * as actions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import * as projectActions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { User } from '../domain/user.model';

export interface State {
  ids: string[];
  entities: { [id: string]: User };
}

export const initialState: State = {
  ids: [],
  entities: {},
};

const addUser = (state, action) => {
  const user = (<actions.AddSuccessAction>action).payload;
  if (state.entities[user.id]) {
    return state;
  }
  const newIds = [ ...state.ids, user.id ];
  const newEntities = { ...state.entities, [user.id]: user };
  return state.entities[user.id] ? 
    { ...state, entities: newEntities } :
    { ...state, id: newIds, entities: newEntities };
};

const updateUser = (state, action) => {
  const users = (<actions.UpdateSuccessAction>action).payload;
  const incomingEntities = _.chain(users)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = { ...state.entities, ...incomingEntities };
  return { ...state, entities: newEntities };
};

const delUser = (state, action) => {
  const user = (<actions.DeleteSuccessAction>action).payload;
  const newEntities = { ...state.entities, [user.id]: user };
  return state.entities[user.id] ?
    { ...state, entities: newEntities } :
    state;
};

const loadUsers = (state, action) => {
  const users = (<actions.LoadSuccessAction>action).payload;
  const incomingIds = users.map(u => u.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(users)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});

  return {
    ids: [ ...state.ids, ...newIds ],
    entities: { ...state.entities, ...newEntities },
  }
};


export function reducer(state: State = initialState, action: actions.UserActions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addUser(state, action);
    case actions.ActionTypes.UPDATE_SUCCESS:
      return updateUser(state, action);
    case actions.ActionTypes.DELETE_SUCCESS:
      return delUser(state, action);
    case actions.ActionTypes.LOAD_SUCCESS:
    case actions.ActionTypes.SEARCH_SUCCESS:
      return loadUsers(state, action);
    case authActions.ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

export const getUsers = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
