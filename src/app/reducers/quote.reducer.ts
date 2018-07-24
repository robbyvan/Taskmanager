import { Quote } from '../domain';
import * as actions from '../actions/quote.action';
import * as authActions from '../actions/auth.action';

export interface State {
  quote: Quote;
}

export const initialState: State = {
  quote: {
    cn: "书籍很多, 时间却太少",
    en: "So many books, so little time.",
    pic: "assets/img/quote_fallback.jpg",
  }
};

export function reducer(state: State = initialState, action: actions.QuoteActions): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      return { ...state, quote: <Quote>action.payload };
    case actions.ActionTypes.LOAD_FAIL:
    case authActions.ActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const getQuote = (state: State) => state.quote;
