import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  items = [
    {
      id: 1,
      name: 'David'
    }, {
      id: 2,
      name: 'Meg'
    }, {
      id: 3,
      name: 'Dwight'
    },
  ];

  myControl: FormControl = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  displayUser(user: { id: string; name: string}) {
    return user ? user.name : '';
  }

}
