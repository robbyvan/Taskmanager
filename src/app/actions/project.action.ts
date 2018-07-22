import { Action } from '@ngrx/store';
import { Project } from '../domain/project.model';
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
  SELECT_PROJECT: type('[Project] Select Project')
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
  | LoadFailAction;
