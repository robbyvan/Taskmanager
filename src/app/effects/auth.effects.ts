import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import * as authActions from '../actions/auth.action';
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth.action';
import { Auth } from '../domain/auth.model';
import { User } from '../domain/user.model';
import  * as routerActions from '../actions/router.action';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<AuthActions>(authActions.ActionTypes.LOGIN)
    .map(a => a.payload)
    .switchMap(({ email, password }: {email: string, password: string}) => this.service$.login(email, password)
      .map(auth => new authActions.LoginSuccessAction(auth))
      .catch(err => of(new authActions.LoginFailAction(JSON.stringify(err))))
    );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType<AuthActions>(authActions.ActionTypes.REGISTER)
    .map(a => a.payload)
    .switchMap((user: User) => this.service$.register(user)
      .map(auth => new authActions.RegisterSuccessAction(auth))
      .catch(err => of(new authActions.RegisterFailAction(JSON.stringify(err))))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType<AuthActions>(authActions.ActionTypes.LOGOUT)
    .map(_ => new routerActions.Go({ path: ['/'] }));

  @Effect()
  loginAndNavigate$: Observable<Action> = this.actions$
    .ofType<AuthActions>(authActions.ActionTypes.LOGIN_SUCCESS)
    .map(_ => new routerActions.Go({ path: ['/project'] }));

  @Effect()
  registerAndNavigate$: Observable<Action> = this.actions$
    .ofType<AuthActions>(authActions.ActionTypes.REGISTER_SUCCESS)
    .map(_ => new routerActions.Go({ path: ['/project'] }));

  constructor(private actions$: Actions, private service$: AuthService) { }
}
