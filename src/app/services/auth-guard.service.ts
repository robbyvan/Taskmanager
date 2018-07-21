import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../reducers';
import  * as routerActions from '../actions/router.action';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store$: Store<fromRoot.State>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$
      .select(fromRoot.getAuthState)
      .map(auth => {
        const result = auth.token !== null && auth.token !== undefined;
        if (result) {
          this.store$.dispatch(new routerActions.Go({ path: ['/login']}))
        }
        return result;
      })
      .defaultIfEmpty(false);
    
  }

}
