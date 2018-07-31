import { Action } from '@ngrx/store';
import { Project } from '../domain/project.model';
import { TaskList } from '../domain/task-list.model';
import { User } from '../domain/user.model';
import { type } from '../utils/type.util';

export const ActionTypes = {
  ADD: type('[Project] Add'),
  ADD_SUCCESS: type('[Project] Add Success'),
  ADD_FAIL: type('[Project] Add Fail'),
  UPDATE: type('[Project] Update'),
  UPDATE_SUCCESS: type('[Project] Update Success'),
  UPDATE_FAIL: type('[Project] Update Fail'),
  DELETE: type('[Project] Delete'),
  DELETE_SUCCESS: type('[Project] Delete Success'),
  DELETE_FAIL: type('[Project] Delete Fail'),
  LOAD: type('[Project] Load'),
  LOAD_SUCCESS: type('[Project] Load success'),
  LOAD_FAIL: type('[Project] Load fail'),
  INVITE: type('[Project] Invite'),
  INVITE_SUCCESS: type('[Project] Invite success'),
  INVITE_FAIL: type('[Project] Invite fail'),
  SELECT_PROJECT: type('[Project] Select Project'),
  ADD_LIST_TO_PROJECT: type('[Add List To Project] Update tasklist refs under selected project'),
  ADD_LIST_TO_PROJECT_SUCCESS: type('[Add List To Project Success] Update tasklist refs under selected project Success'),
  ADD_LIST_TO_PROJECT_FAIL: type('[Add List To Project Fail] Update tasklist refs under selected project Fail'),
  DELETE_LIST_FROM_PROJECT: type('[Delete List From Project] Update tasklist refs under selected project'),
  DELETE_LIST_FROM_PROJECT_SUCCESS: type('[Delete List From Project Success] Update tasklist refs under selected project Success'),
  DELETE_LIST_FROM_PROJECT_FAIL: type('[Delete List From Project Fail] Update tasklist refs under selected project Fail'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: any) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(public payload: string) { }
}

export class AddAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: Project) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: Project) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: string) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;
  constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Project) { }
}

export class UpdateFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;
  constructor(public payload: string) { }
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Project) { }
}

export class DeleteFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;
  constructor(public payload: string) { }
}

export class InviteAction implements Action {
  type = ActionTypes.INVITE;
  constructor(public payload: { projectId: string; members: User[] }) { }
}

export class InviteSuccessAction implements Action {
  type = ActionTypes.INVITE_SUCCESS;
  constructor(public payload: Project) { }
}

export class InviteFailAction implements Action {
  type = ActionTypes.INVITE_FAIL;
  constructor(public payload: string) { }
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT_PROJECT;
  constructor(public payload: Project) { }
}

export class AddListToProjectAction implements Action {
  type = ActionTypes.ADD_LIST_TO_PROJECT;
  constructor(public payload: TaskList) { }
}

export class AddListToProjectSuccessAction implements Action {
  type = ActionTypes.ADD_LIST_TO_PROJECT_SUCCESS;
  constructor(public payload: Project) { }
}

export class AddListToProjectFailAction implements Action {
  type = ActionTypes.ADD_LIST_TO_PROJECT_FAIL;
  constructor(public payload: string) { }
}

export class DeleteListFromProjectAction implements Action {
  type = ActionTypes.DELETE_LIST_FROM_PROJECT;
  constructor(public payload: TaskList) { }
}

export class DeleteListFromProjectSuccessAction implements Action {
  type = ActionTypes.DELETE_LIST_FROM_PROJECT_SUCCESS;
  constructor(public payload: Project) { }
}

export class DeleteListFromProjectFailAction implements Action {
  type = ActionTypes.DELETE_LIST_FROM_PROJECT_FAIL;
  constructor(public payload: string) { }
}

export type ProjectActions
  = AddAction
  | AddSuccessAction
  | AddFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | InviteAction
  | InviteSuccessAction
  | InviteFailAction
  | SelectAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | AddListToProjectAction
  | AddListToProjectSuccessAction
  | AddListToProjectFailAction
  | DeleteListFromProjectAction
  | DeleteListFromProjectSuccessAction
  | DeleteListFromProjectFailAction
  ;
