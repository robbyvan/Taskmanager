import { Component, OnInit, Input, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IdentityType, Identity } from '../../domain/user.model';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  identityTypes = [{
    value: IdentityType.IdCard,
    label: '身份证',
  },{
    value: IdentityType.Insurance,
    label: '医保',
  },{
    value: IdentityType.Passport,
    label: '护照',
  },{
    value: IdentityType.Military,
    label: '军官证',
  },{
    value: IdentityType.Other,
    label: '其他',
  }];
  identity: Identity = { identityType: null, identityNo: null };

  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private sub: Subscription;

  ngOnInit() {
    const val$ = combineLatest(this.idNo, this.idType, (_no, _type) => ({ identityType: _type, identityNo: _no}));
    this.sub = val$.subscribe(id => this.propagateChange(id));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  private propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{
  }

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (! val) {
      return null;
    }
    switch (val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default:
        return null;
    }
  }

  validateIdCard(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return { idInvalid: true };
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }

  validatePassport(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return { idInvalid: true };
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }

  validateMilitary(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if (val.length !== 18) {
      return { idInvalid: true };
    }
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }

}
