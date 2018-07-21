import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../domain/auth.model';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter<void>();
  @Output() darkThemeToggle = new EventEmitter<boolean>();
  auth$: Observable<Auth>;

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuthState);
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggleMenu.emit();
  }

  onThemeChange(checked: boolean) {
    this.darkThemeToggle.emit(checked);
  }

  logout() {
    this.store$.dispatch(new authActions.LogoutAction(null));
  }

}
