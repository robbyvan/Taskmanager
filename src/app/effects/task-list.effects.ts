import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as routerActions from '../actions/router.action';
import * as taskListActions from '../actions/task-list.action';
import * as taskActions from '../actions/task.action';

import { TaskListService } from '../services/task-list.service';
import { User } from '../domain/user.model';
import { TaskList } from '../domain/task-list.model';


@Injectable()
export class TaskListEffects {
  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType<taskListActions.LoadAction>(taskListActions.ActionTypes.LOAD)
    .map(a => a.payload)
    .switchMap((projectId) => this.service$.get(projectId)
      .map(taskLists => new taskListActions.LoadSuccessAction(taskLists))
      .catch(err => of(new taskListActions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTaskLists$: Observable<Action> = this.actions$
    .ofType<taskListActions.AddAction>(taskListActions.ActionTypes.ADD)
    .map(a => a.payload)
    .switchMap((taskList) => this.service$.add(taskList)
        .map(tl => new taskListActions.AddSuccessAction(tl))
        .catch(err => of(new taskListActions.AddFailAction(JSON.stringify(err))))
    );

  @Effect()
  updateTaskLists$: Observable<Action> = this.actions$
    .ofType<taskListActions.UpdateAction>(taskListActions.ActionTypes.UPDATE)
    .map(a => a.payload)
    .switchMap((taskList) => this.service$.update(taskList)
        .map(tl => new taskListActions.UpdateSuccessAction(tl))
        .catch(err => of(new taskListActions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  delTaskLists$: Observable<Action> = this.actions$
    .ofType<taskListActions.DeleteAction>(taskListActions.ActionTypes.DELETE)
    .map(a => a.payload)
    .switchMap((taskList) => this.service$.del(taskList)
        .map(tl => new taskListActions.DeleteSuccessAction(tl))
        .catch(err => of(new taskListActions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  swap$: Observable<Action> = this.actions$
    .ofType<taskListActions.SwapAction>(taskListActions.ActionTypes.SWAP)
    .map(a => a.payload)
    .switchMap(({ src, target }) => this.service$.swapOrder(src, target)
        .map(taskList => new taskListActions.SwapSuccessAction(taskList))
        .catch(err => of(new taskListActions.SwapFailAction(JSON.stringify(err))))
    );

  @Effect()
  what$: Observable<Action> = this.actions$
    .ofType<taskListActions.LoadSuccessAction>(taskListActions.ActionTypes.LOAD_SUCCESS)
    .map(a => a.payload)
    .map(lists => new taskActions.LoadAction(lists));


  constructor(
    private actions$: Actions,
    private service$: TaskListService,
    private store$: Store<fromRoot.State>
  ) { }
}