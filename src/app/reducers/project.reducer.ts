import * as _ from 'lodash';

import { Project } from '../domain/project.model';
import { User } from '../domain/user.model';
import { createSelector } from 'reselect';
import * as actions from '../actions/project.action';
import * as authActions from '../actions/auth.action';
import * as taskListActions from '../actions/task-list.action';

export interface State {
  ids: string[];
  entities: { [id: string]: Project };
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const addProject = (state, action) => {
  const project = (<actions.AddSuccessAction>action).payload;
  if (state.entities[project.id]) {
    return state;
  }
  const newIds = [ ...state.ids, project.id ];
  const newEntities = { ...state.entities, [project.id]: project };
  return { ...state, ids: newIds, entities: newEntities };
};

const updateProject = (state, action) => {
  const project = (<actions.UpdateSuccessAction>action).payload;
  const newEntities = { ...state.entities, [project.id]: project  }
  return { ...state, entities: newEntities };
};

const delProject = (state, action) => {
  const project = (<actions.DeleteSuccessAction>action).payload;
  const newIds = state.ids.filter(id => id !== project.id);
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: state.entities[id] }), {});
  return { ids: newIds, entities: newEntities, selectedId: null };
};

const loadProjects = (state, action) => {
  const projects = (<actions.LoadSuccessAction>action).payload;
  if (projects === null) {
    return state;
  }

  const ids = projects.reduce((result, project) => [ ...result, project.id ], []);
  const entities = projects.reduce((result, project) => ({ ...result, [project.id]: project }) , {});
  return {
    ids,
    entities,
    selectedId: null
  };

  // const incomingIds = projects.map(p => p.id);
  // const newIds = _.difference(incomingIds, state.ids);
  // if (newIds.length === 0) {
  //   return state;
  // }
  // const incomingEntities = _.chain(projects)
  //   .keyBy('id')
  //   .mapValues(o => o)
  //   .value();
  // const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});

  // return {
  //   ids: [ ...state.ids, ...newIds ],
  //   entities: { ...state.entities, ...newEntities },
  //   selectedId: null
  // }
};

// const addListToProject = (state, action) => {
//   const taskList = (<taskListActions.AddAction>action).payload;
//   const targetProject = state.entities[state.selectedId];
//   const updatedProjectEntity = { ...targetProject, taskLists: [...targetProject.taskLists, taskList.id ] }
//   const newEntities = { ...state.entities, [targetProject.id]: updatedProjectEntity  }

//   return { ...state, entities: newEntities };
// };

export function reducer(state: State = initialState, action: actions.ProjectActions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addProject(state, action);
    case actions.ActionTypes.UPDATE_SUCCESS:
    case actions.ActionTypes.INVITE_SUCCESS:
    case actions.ActionTypes.ADD_LIST_TO_PROJECT_SUCCESS:
    case actions.ActionTypes.DELETE_LIST_FROM_PROJECT_SUCCESS:
      return updateProject(state, action);
    case actions.ActionTypes.DELETE_SUCCESS:
      return delProject(state, action);
    case actions.ActionTypes.LOAD_SUCCESS:
      return loadProjects(state, action);
    case actions.ActionTypes.SELECT_PROJECT:
      const selectedProject = <Project>action.payload;
      return { ...state, selectedId: selectedProject.id };
    case authActions.ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getAll = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
export const getSelectedProject = createSelector(getSelectedId, getEntities, (id, entities) => entities[id]);
