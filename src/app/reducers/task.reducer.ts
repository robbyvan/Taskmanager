import * as _ from 'lodash';
import { createSelector } from 'reselect';

import * as actions from '../actions/task.action';
import * as authActions from '../actions/auth.action';
import * as projectActions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { TaskList } from '../domain/task-list.model';
import { Task } from '../domain/task.model';
import { User } from '../domain/user.model';

export interface State {
  ids: string[];
  entities: { [id: string]: Task };
}

export const initialState: State = {
  ids: [],
  entities: {},
};

const addTask = (state, action) => {
  const task = (<actions.AddSuccessAction>action).payload;
  if (state.entities[task.id]) {
    return state;
  }
  const newIds = [ ...state.ids, task.id ];
  const newEntities = { ...state.entities, [task.id]: task };
  return { ...state, ids: newIds, entities: newEntities };
};

const updateTask = (state, action) => {
  const task = (<actions.UpdateSuccessAction>action).payload;
  const newEntities = { ...state.entities, [task.id]: task  }
  return { ...state, entities: newEntities };
};

const delTask = (state, action) => {
  const task = (<actions.DeleteSuccessAction>action).payload;
  const newIds = state.ids.filter(id => id !== task.id);
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: state.entities[id] }), {});
  
  return { ids: newIds, entities: newEntities };
};

const loadTasks = (state, action) => {
  const tasks = (<actions.LoadSuccessAction>action).payload;
  const incomingIds = tasks.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(tasks)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});

  return {
    ids: [ ...state.ids, ...newIds ],
    entities: { ...state.entities, ...newEntities },
  }
};

const moveAllTasks = (state, action) => {
  const tasks = (<actions.MoveAllSuccessAction>action).payload;
  const updatedEntities = tasks.reduce((entities, task) => ({ ...entities, [task.id]: task }), {});
  return {
    ...state,
    selectedIds: { ...state.entities, ...updatedEntities },
  };
}

const delTasksByProject = (state, action) => {
  const project = (<projectActions.DeleteSuccessAction>action).payload;
  const taskListIds = project.taskLists;
  const remainingIds = state.ids.filter(id => taskListIds.indexOf(state.entities[id].taskListId) === -1)
  const remainingEntities = remainingIds.reduce((entities, id) => ({ ...entities, [id]: state.entities[id] }), {});
  return {
    ids: [ ...remainingIds ],
    entities: remainingEntities,
  };
}

export function reducer(state: State = initialState, action: actions.TaskActions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addTask(state, action);
    case actions.ActionTypes.UPDATE_SUCCESS:
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.MOVE_SUCCESS:
      return updateTask(state, action);
    case actions.ActionTypes.DELETE_SUCCESS:
      return delTask(state, action);
    case actions.ActionTypes.LOAD_SUCCESS:
      return loadTasks(state, action);
    case actions.ActionTypes.MOVE_ALL_SUCCESS:
      return moveAllTasks(state, action);
    case projectActions.ActionTypes.DELETE_SUCCESS:
      return delTasksByProject(state, action);
    case authActions.ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;

export const getTasks = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
