import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';

import { TaskList } from '../../domain/task-list.model';
import * as fromRoot from '../../reducers';
import * as taskListActions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';


@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private store$: Store<fromRoot.State>,
  ) {
    this.projectId$ = this.route.paramMap.map(p => p.get('id'));
    this.lists$ = this.store$.select(fromRoot.getTasksByLists);
  }

  ngOnInit() {
  }

  /*新建任务*/
  openNewTaskDialog(list) {
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .map(user => this.dialog.open(NewTaskComponent, { data: { title: '新的任务', owner: user } }))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
      .subscribe(val => this.store$.dispatch(new taskActions.AddAction({ ...val, taskListId: list.id, completed: false, createDate: new Date() })))
  }

  /*修改任务(直接点击)*/
  openTaskClickDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '编辑任务', task: task } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(val => this.store$.dispatch(new taskActions.UpdateAction({ ...task, ...val })));
  }

  /*新建任务列表*/
  openNewListDialog(e: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新的任务列表' } });
    dialogRef.afterClosed()
      .take(1)
      .withLatestFrom(this.projectId$, (val, projectId) => ({ ...val, projectId: projectId}))
      .subscribe(result => this.store$.dispatch(new taskListActions.AddAction(result)));
  }

  /*修改任务列表*/
  openEditListDialog(list: TaskList) {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改任务列表', taskList: list } });
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store$.dispatch(new taskListActions.UpdateAction({ ...result, id: list.id })));
  }

  /*移动列表所有任务*/
  openCopyTaskDialog(list) {
    this.lists$.map(l => l.filter(n => n.id !== list.id))
    .map(li => this.dialog.open(CopyTaskComponent, { data: { lists: li } }))
    .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
    .subscribe(val => this.store$.dispatch(new taskActions.MoveAllAction({ srcListId: list.id, targetListId: val})));
  }

  /*删除列表*/
  openConfirmDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '移除', content: '确认删除当前任务列表吗?'} });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(result => this.store$.dispatch(new taskListActions.DeleteAction(list)));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case "task-item":
        console.log('handling item');
        break;
      case "task-list":
        console.log('handling list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string, list) {
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .subscribe(user => this.store$.dispatch(new taskActions.AddAction({
        taskListId: list.id,
        desc: desc,
        completed: false,
        participantsIds: [],
        priority: 3,
        createDate: new Date(),
        ownerId: user.id,
      })));
  }

}
