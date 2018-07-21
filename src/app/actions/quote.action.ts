import { Action } from '@ngrx/store';
import { Quote } from '../domain/quote.model';
import { type } from '../utils/type.util';

// export const QUOTE = 'QUOTE';
// export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
// export const QUOTE_FAIL = 'QUOTE_FAIL';

export const ActionTypes = {
  LOAD: type('[Quote] Load'),
  LOAD_SUCCESS: type('[Quote] Load success'),
  LOAD_FAIL: type('[Quote] Load fail')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: Quote) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Quote) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(public payload: string) { }
}

export type Actions 
  = LoadAction
  | LoadSuccessAction 
  | LoadFailAction;
