import * as _ from 'lodash';
import { createSelector } from 'reselect';
import * as authActions from '../actions/auth.action';

import * as actions from '../actions/task-list.action';
import * as projectActions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { TaskList } from '../domain/task-list.model';
import { User } from '../domain/user.model';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskList };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
};

const addTaskList = (state, action) => {
  console.log('gonna add list');
  const taskList = (<actions.AddSuccessAction>action).payload;
  console.log('this is new', taskList);
  if (state.entities[taskList.id]) {
    return state;
  }
  const newIds = [ ...state.ids, taskList.id ];
  console.log('gonna add list', newIds);
  const newEntities = { ...state.entities, [taskList.id]: taskList };
  const newSelectedIds = [ ...state.selectedIds, taskList.id];
  return { ...state, ids: newIds, entities: newEntities, selectedIds: newSelectedIds };
};

const updateTaskList = (state, action) => {
  const taskList = (<actions.UpdateSuccessAction>action).payload;
  const newEntities = { ...state.entities, [taskList.id]: taskList  }
  return { ...state, entities: newEntities };
};

const delTaskList = (state, action) => {
  const taskList = (<actions.DeleteSuccessAction>action).payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: state.entities[id] }), {});
  const newselectedIds = state.selectedIds.filter(id => id !== taskList.id);
  return { ids: newIds, entities: newEntities, selectedIds: newselectedIds };
};

const loadTaskLists = (state, action) => {
  const taskLists = (<actions.LoadSuccessAction>action).payload;
  if (taskLists === null) {
    return state;
  }
  const incomingIds = taskLists.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  if (newIds.length === 0) {
    return state;
  }
  const incomingEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});

  return {
    ...state,
    ids: [ ...state.ids, ...newIds ],
    entities: { ...state.entities, ...newEntities },
  }
};

const swapTaskList = (state, action) => {
  const taskLists = (<actions.SwapSuccessAction>action).payload;
  const updatedEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = { ...state.entities, ...updatedEntities };
  return {
    ...state,
    entities: newEntities,
  };
}

const selectProject = (state, action) => {
  const selected = (<projectActions.SelectAction>action).payload;
  const selectedIds = state.ids.filter(id => state.entities[id].projectId === selected.id);
  return {
    ...state,
    selectedIds: selectedIds,
  };
}

const delListsByProject = (state, action) => {
  const project = (<projectActions.DeleteSuccessAction>action).payload;
  const taskListIds = project.taskLists;
  const remainingIds = _.difference(state.ids, taskListIds);
  const remainingEntities = remainingIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});

  return {
    ids: [...remainingIds],
    entities: remainingEntities,
    selectedIds: []
  };
}

export function reducer(state: State = initialState, action: actions.TaskListActions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addTaskList(state, action);
    case actions.ActionTypes.UPDATE_SUCCESS:
      return updateTaskList(state, action);
    case actions.ActionTypes.DELETE_SUCCESS:
      return delTaskList(state, action);
    case actions.ActionTypes.LOAD_SUCCESS:
      return loadTaskLists(state, action);
    case actions.ActionTypes.SWAP_SUCCESS:
      return swapTaskList(state, action);
    case projectActions.ActionTypes.SELECT_PROJECT:
      return selectProject(state, action);
    case projectActions.ActionTypes.DELETE_SUCCESS:
      return delListsByProject(state, action);
    case authActions.ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;

export const getSelected = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
