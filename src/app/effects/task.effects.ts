import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import  * as routerActions from '../actions/router.action';
import * as taskActions from '../actions/task.action';
import { TaskService } from '../services/task.service';
import { User } from '../domain/user.model';
import { Task } from '../domain/task.model';


@Injectable()
export class TaskEffects {
  @Effect()
  loadTasks$: Observable<Action> = this.actions$
    .ofType<taskActions.LoadAction>(taskActions.ActionTypes.LOAD)
    .map(a => a.payload)
    .switchMap((taskLists) => this.service$.getByLists(taskLists)
      .map(tasks => new taskActions.LoadSuccessAction(tasks))
      .catch(err => of(new taskActions.LoadFailAction(JSON.stringify(err))))
    );

  @Effect()
  addTasks$: Observable<Action> = this.actions$
    .ofType<taskActions.AddAction>(taskActions.ActionTypes.ADD)
    .map(a => a.payload)
    .switchMap((task) => this.service$.add(task)
        .map(t => new taskActions.AddSuccessAction(t))
        .catch(err => of(new taskActions.AddFailAction(JSON.stringify(err))))
    );

  @Effect()
  updateTasks$: Observable<Action> = this.actions$
    .ofType<taskActions.UpdateAction>(taskActions.ActionTypes.UPDATE)
    .map(a => a.payload)
    .switchMap((task) => this.service$.update(task)
        .map(t => new taskActions.UpdateSuccessAction(t))
        .catch(err => of(new taskActions.UpdateFailAction(JSON.stringify(err))))
    );

  @Effect()
  delTasks$: Observable<Action> = this.actions$
    .ofType<taskActions.DeleteAction>(taskActions.ActionTypes.DELETE)
    .map(a => a.payload)
    .switchMap((task) => this.service$.del(task)
        .map(t => new taskActions.DeleteSuccessAction(t))
        .catch(err => of(new taskActions.DeleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  complete$: Observable<Action> = this.actions$
    .ofType<taskActions.CompleteAction>(taskActions.ActionTypes.COMPLETE)
    .map(a => a.payload)
    .switchMap((task) => this.service$.del(task)
        .map(t => new taskActions.CompleteSuccessAction(t))
        .catch(err => of(new taskActions.CompleteFailAction(JSON.stringify(err))))
    );

  @Effect()
  move$: Observable<Action> = this.actions$
    .ofType<taskActions.MoveAction>(taskActions.ActionTypes.MOVE)
    .map(a => a.payload)
    .switchMap(({ taskId, listId }) => this.service$.move(taskId, listId)
        .map(task => new taskActions.MoveSuccessAction(task))
        .catch(err => of(new taskActions.MoveFailAction(JSON.stringify(err))))
    );

  @Effect()
  moveAll$: Observable<Action> = this.actions$
    .ofType<taskActions.MoveAllAction>(taskActions.ActionTypes.MOVE_ALL)
    .map(a => a.payload)
    .switchMap(({ srcListId, targetListId }) => this.service$.moveAll(srcListId, targetListId)
        .map(tasks => new taskActions.MoveAllSuccessAction(tasks))
        .catch(err => of(new taskActions.MoveAllFailAction(JSON.stringify(err))))
    );


  constructor(
    private actions$: Actions,
    private service$: TaskService,
    private store$: Store<fromRoot.State>
  ) { }
}