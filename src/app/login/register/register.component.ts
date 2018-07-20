import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { getAddrByCode, isValidAddr, extractInfo } from '../../utils/identity.util';
import { isValidDate } from '../../utils/date.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  avatars: string[];
  registerForm: FormGroup;
  sub: Subscription;

  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.avatars = nums.map(num => `avatars:svg-${num}`);

    this.registerForm = this.fb.group({
      email: [],
      name: [],
      password: [],
      confirmpassword: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01'],
      address: [],
      identity: [],
    });

    const id$ = this.registerForm.get('identity').valueChanges
      .debounceTime(300)
      .filter(_ => this.registerForm.get('identity').valid);

    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.registerForm.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) {
        this.registerForm.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault()
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
