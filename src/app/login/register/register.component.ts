import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  avatars: string[];
  registerForm: FormGroup;
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
    })
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault()
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
