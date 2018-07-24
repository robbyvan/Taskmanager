import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { TaskService } from '../../services/task.service';
import { startOfDay, endOfDay } from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#fae3e3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#d1e8ff',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#fdf1ba',
  },
};

const getColor = (priority: number) => {
  switch (priority) {
    case 1:
      return colors.red;
    case 2:
      return colors.blue;
    default:
      return colors.yellow;
  }
};

@Component({
  selector: 'app-calendar-home',
  template: `
    <mat-card>
      <div class="toolbar">
        <button
          mat-icon-button
          mwlCalendarPreviousView
          [view]="view$ | async"
          [(viewDate)]="viewDate"
        >
          <mat-icon class="mat-48">chevron_left</mat-icon>
        </button>
        <button mat-button mwlCalendarToday>
          {{ viewDate | date:'yyyy-MM-dd' }}
        </button>
        <button
          mat-icon-button
          mwlCalendarNextView
          [view]="view$ | async"
          [(viewDate)]="viewDate"
        >
          <mat-icon class="mat-48">chevron_right</mat-icon>
        </button>
      </div>
      
      <ng-container *ngIf="(events$ | async) as calEvents">
        <div [ngSwitch]="view$ | async">
          <mwl-calendar-month-view *ngSwitchDefault
            [viewDate]="viewDate"
            [events]="calEvents"
            (eventClicked)="handleEvent('clicked', $event.event)"
          ></mwl-calendar-month-view>

          <mwl-calendar-week-view *ngSwitchCase="'week'"
            [viewDate]="viewDate"
            [events]="calEvents"
            (eventClicked)="handleEvent('clicked', $event.event)"
          ></mwl-calendar-week-view>

          <mwl-calendar-day-view *ngSwitchCase="'day'"
            [viewDate]="viewDate"
            [events]="calEvents"
            (eventClicked)="handleEvent('clicked', $event.event)"
          ></mwl-calendar-day-view>
        </div>
      </ng-container>
    </mat-card>
  `,
  styles: []
})
export class CalendarHomeComponent implements OnInit {

  viewDate: Date;
  view$: Observable<string>;
  events$: Observable<CalendarEvent[]>;

  constructor(
    private route$: ActivatedRoute,
    private service$: TaskService,
    private store$: Store<fromRoot.State>
    ) {
    this.viewDate = new Date();
    this.view$ = this.route$.paramMap.map(p => p.get('view'));
    this.events$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user.id)
      .switchMap(userId => this.service$.getUserTasks(userId))
      .map(tasks => tasks.map(task => ({
        start: startOfDay(task.createDate),
        end: endOfDay(task.dueDate),
        title: task.desc,
        color: getColor(task.priority),
      })))
  }

  ngOnInit() { }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled');
  }

}
