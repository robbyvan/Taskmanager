import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    console.log(form);
    const { value, valid } = form;
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }

  validate(fc: FormControl): {[key: string]: any} {
    if (!fc.value) {
      return null;
    }
    const pattern = /^van+/;
    if (pattern.test(fc.value)) {
      return null;
    }
    return {
      emailNotValid: 'Email must start with "van"'
    };
  }

}
