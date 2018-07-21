import * as actions from '../actions/auth.action';
import { Auth } from '../domain/auth.model';
// import { User } from '../domain/user.model';

export const initialState: Auth = {};

export function reducer(state: Auth = initialState, action: actions.AuthActions): Auth {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
    case actions.ActionTypes.REGISTER_SUCCESS:
      return { ...<Auth>action.payload };
    case actions.ActionTypes.LOGIN_FAIL:
    case actions.ActionTypes.REGISTER_FAIL:
    case actions.ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
