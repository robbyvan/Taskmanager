import { Component, OnInit, Inject, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  title = '';
  projects = [
    {
      "id": 1,
      "name": "企业协作平台",
      "desc": "A demo project.",
      "coverImg": "assets/img/covers/0.jpg",
    },
    {
      "id": 2,
      "name": "企业协作平台",
      "desc": "A demo project.",
      "coverImg": "assets/img/covers/1.jpg",
    }
  ];

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'New Project' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [
        ...this.projects, 
        { id: 3, name: 'A new Project', desc: 'This is a new project', coverImg: "assets/img/covers/8.jpg"},
        { id: 4, name: 'Another Project', desc: 'This is another project', coverImg: "assets/img/covers/9.jpg"},
      ];
    this.cd.markForCheck();
    });    
  }

  openEditProjectDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '修改项目', project: project } });
  }

  openInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  openConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: {title: '删除项目', content: '确认删除此项目吗?'} });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
  
}
