import { Action } from '@ngrx/store';
import { Auth } from '../domain/auth.model';
import { User } from '../domain/user.model';
import { type } from '../utils/type.util';

export const ActionTypes = {
  LOGIN: type('[Auth] Login'),
  LOGIN_SUCCESS: type('[Auth] Login Success'),
  LOGIN_FAIL: type('[Auth] Login Fail'),
  REGISTER: type('[Auth] Register'),
  REGISTER_SUCCESS: type('[Auth] Register Success'),
  REGISTER_FAIL: type('[Auth] Register Fail'),
  LOGOUT: type('[Auth] Logout'),
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
  constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: Auth) { }
}

export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;
  constructor(public payload: string) { }
}

export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;
  constructor(public payload: User) { }
}

export class RegisterSuccessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;
  constructor(public payload: Auth) { }
}

export class RegisterFailAction implements Action {
  type = ActionTypes.REGISTER_FAIL;
  constructor(public payload: string) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
  constructor(public payload: null) { }
}

export type AuthActions 
  = LoginAction
  | LoginSuccessAction 
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;
