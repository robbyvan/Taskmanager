import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import  * as routerActions from '../actions/router.action';
import * as userActions from '../actions/user.action';
import { UserService } from '../services/user.service';
import { User } from '../domain/user.model';


@Injectable()
export class UserEffects {
  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType<userActions.LoadAction>(userActions.ActionTypes.LOAD)
    .map(a => a.payload)
    .switchMap((projectId) => this.service$.getUsersByProject(projectId)
      .map(users => new userActions.LoadSuccessAction(users))
      .catch(err => of(new userActions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addUserProjectRef$: Observable<Action> = this.actions$
    .ofType<userActions.AddAction>(userActions.ActionTypes.ADD)
    .map(a => a.payload)
    .switchMap(({ user, projectId }) => this.service$.addProjectRef(user, projectId)
        .map(u => new userActions.AddSuccessAction(u))
        .catch(err => of(new userActions.AddFailAction(JSON.stringify(err))))
    );

  @Effect()
  updateUserProjectRef$: Observable<Action> = this.actions$
    .ofType<userActions.UpdateAction>(userActions.ActionTypes.UPDATE)
    .map(a => a.payload)
    .switchMap((project) => this.service$.batchUpdateProjectRef(project)
        .map(users => new userActions.UpdateSuccessAction(users))
        .catch(err => of(new userActions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  delUserProjectRef$: Observable<Action> = this.actions$
    .ofType<userActions.DeleteAction>(userActions.ActionTypes.DELETE)
    .map(a => a.payload)
    .switchMap(({ user, projectId }) => this.service$.removeProjectRef(user, projectId)
        .map(u => new userActions.DeleteSuccessAction(u))
        .catch(err => of(new userActions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType<userActions.SearchAction>(userActions.ActionTypes.SEARCH)
    .map(a => a.payload)
    .switchMap((str) => this.service$.searchUsers(str)
        .map(users => new userActions.SearchSuccessAction(users))
        .catch(err => of(new userActions.SearchFailAction(JSON.stringify(err))))
    );

  constructor(
    private actions$: Actions,
    private service$: UserService,
    private store$: Store<fromRoot.State>
  ) { }
}