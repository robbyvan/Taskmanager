import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { combineLatest, merge } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import {
  subDays,
  subMonths,
  subYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  isBefore,
  parse,
  format,
  isValid,
  isDate,
  isFuture,
} from 'date-fns';
import { isValidDate } from '../../utils/date.util';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ],
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() maxDays = 90;
  @Input() minDays = 0;
  @Input() maxMonths = 24;
  @Input() minMonths = 1;
  @Input() maxYears = 150;
  @Input() minYears = 1;
  @Input() format = 'YYYY-MM-DD';
  @Input() debounceTime = 300;

  selectedUnit = AgeUnit.Year;
  ageUnits = [
    { value: AgeUnit.Year, label: '岁' },
    { value: AgeUnit.Month, label: '月' },
    { value: AgeUnit.Day, label: '天' },
  ];

  ageForm: FormGroup;
  sub: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.ageForm = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year],
      }, { validator: this.validateAge('ageNum', 'ageUnit') }),
    });
    const birthday = this.ageForm.get('birthday');
    const ageNum = this.ageForm.get('age').get('ageNum');
    const ageUnit = this.ageForm.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => ({ date: d, from: 'birthday' }))
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const age$ = combineLatest(ageNum$, ageUnit$, (_n, _u) => this.toDate({
        age: _n,
        unit: _u,
      }))
      .map(d => ({ date: d, from: 'age' }))
      .filter(_ => this.ageForm.get('age').valid);
    const merged$ = merge(birthday$, age$)
      .filter(_ => this.ageForm.valid);

    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });  
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  private propagateChange = (_: any) => {};

  writeValue(obj: any): void {
    if (obj) {
      console.log('triggered', obj);
      const date = format(obj, this.format);
      this.ageForm.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.ageForm.get('age').get('ageNum').patchValue(age.age);
      this.ageForm.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{
  }

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return ({ dateOfBirthInvalid: true });
  }

  validateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : ({ birthdayInvalid: true });
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup):{[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year:
          result = ageNumVal >= this.minYears && ageNumVal < this.maxYears;
          break;
        case AgeUnit.Month:
          result = ageNumVal >= this.minMonths && ageNumVal < this.maxMonths;
          break;
        case AgeUnit.Day:
          result = ageNumVal >= this.minDays && ageNumVal < this.maxDays;
          break;
        default:
          break;
      }
      return result ? null : { ageInvalid: true };
    }

  }

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return (isBefore(subDays(now, this.maxDays), date) ?
      ({ age: differenceInDays(now, date), unit: AgeUnit.Day }) :
      isBefore(subMonths(now, this.maxMonths), date) ?
        ({ age: differenceInMonths(now, date), unit: AgeUnit.Month }) :
        ({ age: differenceInYears(now,date), unit: AgeUnit.Year }));
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year:
        return format(subYears(now, age.age), this.format);
      case AgeUnit.Month:
        return format(subMonths(now, age.age), this.format);
      case AgeUnit.Day:
        return format(subDays(now, age.age), this.format);
      default:
        return null;
    }
  }

}
