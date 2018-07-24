import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as projectActions from '../../actions/project.action';
import { Project } from '../../domain/project.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  today = 'day';
  projects$: Observable<Project[]>;
  @Output() navClick = new EventEmitter<void>();

  constructor(private store$: Store<fromRoot.State>) {
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
    this.today = `day${getDate(new Date)}`;
  }

  onNavClick() {
    this.navClick.emit();
  }

  onProjectClick(p: Project) {
    this.store$.dispatch(new projectActions.SelectAction(p));
    this.navClick.emit();
  }

}
