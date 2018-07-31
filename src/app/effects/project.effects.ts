import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as projectActions from '../actions/project.action';
import * as routerActions from '../actions/router.action';
import * as taskListActions from '../actions/task-list.action';
import * as userActions from '../actions/user.action';

import { ProjectService } from '../services/project.service';
import { User } from '../domain/user.model';
import { Project } from '../domain/project.model';


@Injectable()
export class ProjectEffects {
  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType<projectActions.LoadAction>(projectActions.ActionTypes.LOAD)
    .map(a => a.payload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(([_, auth]) => this.service$.get(auth.userId)
      .map(projects => new projectActions.LoadSuccessAction(projects))
      .catch(err => of(new projectActions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addProjects$: Observable<Action> = this.actions$
    .ofType<projectActions.AddAction>(projectActions.ActionTypes.ADD)
    .map(a => a.payload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user))
    .switchMap(([project, user]) => {
      const added = { ...project, members:[`${user.id}`]};
      return this.service$.add(added)
        .map(project => new projectActions.AddSuccessAction(project))
        .catch(err => of(new projectActions.AddFailAction(JSON.stringify(err))))
    });

  @Effect()
  updateProjects$: Observable<Action> = this.actions$
    .ofType<projectActions.UpdateAction>(projectActions.ActionTypes.UPDATE)
    .map(a => a.payload)
    .switchMap((project) => this.service$.update(project)
        .map(project => new projectActions.UpdateSuccessAction(project))
        .catch(err => of(new projectActions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  delProjects$: Observable<Action> = this.actions$
    .ofType<projectActions.DeleteAction>(projectActions.ActionTypes.DELETE)
    .map(a => a.payload)
    .switchMap((project) => this.service$.del(project)
        .map(project => new projectActions.DeleteSuccessAction(project))
        .catch(err => of(new projectActions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  invite$: Observable<Action> = this.actions$
    .ofType<projectActions.InviteAction>(projectActions.ActionTypes.INVITE)
    .map(a => a.payload)
    .switchMap(({ projectId, members }) => this.service$.invite(projectId, members)
        .map(project => new projectActions.InviteSuccessAction(project))
        .catch(err => of(new projectActions.InviteFailAction(JSON.stringify(err))))
    );

  @Effect()
  selectProject$: Observable<Action> = this.actions$
    .ofType<projectActions.SelectAction>(projectActions.ActionTypes.SELECT_PROJECT)
    .map(a => a.payload)
    .map(project => new routerActions.Go({ path: [`/tasklist/${project.id}`] }));

  @Effect()
  loadTaskList$: Observable<Action> = this.actions$
    .ofType<projectActions.SelectAction>(projectActions.ActionTypes.SELECT_PROJECT)
    .map(a => a.payload)
    .do(v => console.log('gonna load lists of project: ', v))
    .map(project => new taskListActions.LoadAction(project.id));


  @Effect()
  addListToProject$: Observable<Action> = this.actions$
    .ofType<projectActions.AddListToProjectAction>(projectActions.ActionTypes.ADD_LIST_TO_PROJECT)
    .map(a => a.payload)
    .withLatestFrom(this.store$.select(fromRoot.getSelectedProject))
    .do(([t, p]) => console.log('t, p is:', t, p))
    .switchMap(([taskList, project]) => this.service$.addListToProject(project, taskList)
        .map(p => new projectActions.AddListToProjectSuccessAction(p))
        .catch(err => of(new projectActions.AddListToProjectFailAction(JSON.stringify(err))))
    );

  @Effect()
  delListFromProject$: Observable<Action> = this.actions$
    .ofType<projectActions.DeleteListFromProjectAction>(projectActions.ActionTypes.DELETE_LIST_FROM_PROJECT)
    .map(a => a.payload)
    .withLatestFrom(this.store$.select(fromRoot.getSelectedProject))
    .do(([t, p]) => console.log('t, p is:', t, p))
    .switchMap(([taskList, project]) => this.service$.delListFromProject(project, taskList)
        .map(p => new projectActions.DeleteListFromProjectSuccessAction(p))
        .catch(err => of(new projectActions.DeleteListFromProjectFailAction(JSON.stringify(err))))
    );

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType<projectActions.LoadSuccessAction>(projectActions.ActionTypes.LOAD_SUCCESS)
    .map(a => a.payload)
    .switchMap((projects: Project[]) => from(projects.map(prj => prj.id)))
    .map(projectId => new userActions.LoadAction(projectId));

  @Effect()
  addUserProject$: Observable<Action> = this.actions$
    .ofType<projectActions.AddSuccessAction>(projectActions.ActionTypes.ADD_SUCCESS)
    .map(a => a.payload)
    .map(project => project.id)
    .withLatestFrom(
      this.store$.select(fromRoot.getAuthState).map(auth => auth.user),
      (projectId, user) => new userActions.AddAction({ user, projectId })
    );

  @Effect()
  removeUserProject$: Observable<Action> = this.actions$
    .ofType<projectActions.DeleteSuccessAction>(projectActions.ActionTypes.DELETE_SUCCESS)
    .map(a => a.payload)
    .map(project => project.id)
    .withLatestFrom(
      this.store$.select(fromRoot.getAuthState).map(auth => auth.user),
      (projectId, user) => new userActions.DeleteAction({ user, projectId })
    )

  @Effect()
  updateUserProject$: Observable<Action> = this.actions$
    .ofType<projectActions.InviteSuccessAction>(projectActions.ActionTypes.INVITE_SUCCESS)
    .map(a => a.payload)
    .map(project => new userActions.UpdateAction(project))

  constructor(
    private actions$: Actions,
    private service$: ProjectService,
    private store$: Store<fromRoot.State>
  ) { }
}
