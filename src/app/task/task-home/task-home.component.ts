import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  lists = [
    {
      id: 1,
      name: '待进行',
      order: 1,
      tasks: [{
        id: 1,
        desc: 'Task 1: Buy Coffee',
        completed: true,
        priority: 3,
        owner: {
          id: 1,
          name: 'David',
          avatar: 'avatars:svg-13',
        },
        dueDate: new Date(),
        reminder: new Date(),
      },{
        id: 2,
        desc: 'Task 2: Prepare report slides',
        completed: false,
        priority: 1,
        owner: {
          id: 1,
          name: 'Meg',
          avatar: 'avatars:svg-12',
        },
        dueDate: new Date(),
      }],
    },
    {
      id: 3,
      order: 2,
      name: '进行中',
      tasks: [{
        id: 1,
        desc: 'Task 3: Code review',
        priority: 1,
        completed: false,
        owner: {
          id: 1,
          name: 'Dwight',
          avatar: 'avatars:svg-13',
        },
        dueDate: new Date(),
      },{
        id: 4,
        desc: 'Task 4: Make new task schedule',
        completed: false,
        priority: 2,
        owner: {
          id: 1,
          name: 'Meg',
          avatar: 'avatars:svg-12',
        },
        dueDate: new Date(),
      }],
    },
  ]

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  /*新建任务*/
  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '新任务' } });
  }

  /*修改任务(直接点击)*/
  openTaskClickDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '编辑任务', task: task } });
  }

  /*新建任务列表*/
  openNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新的任务列表' } });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  /*修改任务列表*/
  openEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '修改任务列表' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.cd.markForCheck();
    });
  }

  /*移动列表所有任务*/
  openCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: { lists: this.lists } });
  }

  /*删除列表*/
  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '移除', content: '确认删除当前任务列表吗?'} });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.cd.markForCheck();
    });
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

  handleQuickTask(desc: String) {
    console.log(desc);
  }

}
