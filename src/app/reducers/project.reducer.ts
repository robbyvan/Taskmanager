import * as actions from '../actions/project.action';
import { Project } from '../domain/project.model';
import { User } from '../domain/user.model';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

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
  const incomingIds = projects.map(p => p.id);
  const newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(projects)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds.reduce((entities, id: string) => ({ ...entities, [id]: incomingEntities[id] }), {});

  return {
    ids: [ ...state.ids, ...newIds ],
    entities: { ...state.entities, ...newEntities },
    selectedId: null
  }
};

export function reducer(state: State = initialState, action: actions.ProjectActions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS:
      return addProject(state, action);
    case actions.ActionTypes.UPDATE_SUCCESS:
    case actions.ActionTypes.INVITE_SUCCESS:
      return updateProject(state, action);
    case actions.ActionTypes.DELETE_SUCCESS:
      return delProject(state, action);
    case actions.ActionTypes.LOAD_SUCCESS:
      return loadProjects(state, action);
    case actions.ActionTypes.SELECT_PROJECT:
      const selectedProject = <Project>action.payload;
      return { ...state, selectedId: selectedProject.id };
    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;

export const getAll = createSelector(getIds, getEntities, (ids, entities) => ids.map(id => entities[id]));
