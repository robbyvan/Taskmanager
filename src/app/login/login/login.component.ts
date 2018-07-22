import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Quote } from '../../domain/quote.model';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new actions.LoadAction(null));
  }

  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('van@qq.com', Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required),
    // });
    this.loginForm = this.fb.group({
      email: ['van@qq.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required],
    });
  }

  onSubmit(form, e: Event) {
    e.preventDefault();
    const { value, valid } = form;
    if (!valid) {
      return;
    }
    this.store$.dispatch(new authActions.LoginAction(value));
  }

  validate(fc: FormControl): {[key: string]: any} {
    // if (!fc.value) {
      return null;
    // }
    // const pattern = /^van+/;
    // if (pattern.test(fc.value)) {
    //   return null;
    // }
    // return {
    //   emailNotValid: 'Email must start with "van"'
    // };
  }

}
