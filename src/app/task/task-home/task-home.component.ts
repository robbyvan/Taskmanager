import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待进行',
      order: 1,
      tasks: [{
        id: 1,
        desc: 'Task 1: Buy Coffee',
        completed: true,
        priority: 3,
        owner: {
          id: 1,
          name: 'David',
          avatar: 'avatars:svg-13',
        },
        dueDate: new Date(),
        reminder: new Date(),
      },{
        id: 2,
        desc: 'Task 2: Prepare report slides',
        completed: false,
        priority: 1,
        owner: {
          id: 1,
          name: 'Meg',
          avatar: 'avatars:svg-12',
        },
        dueDate: new Date(),
      }],
    },
    {
      id: 3,
      order: 2,
      name: '进行中',
      tasks: [{
        id: 1,
        desc: 'Task 3: Code review',
        priority: 1,
        completed: false,
        owner: {
          id: 1,
          name: 'Dwight',
          avatar: 'avatars:svg-13',
        },
        dueDate: new Date(),
      },{
        id: 4,
        desc: 'Task 4: Make new task schedule',
        completed: false,
        priority: 2,
        owner: {
          id: 1,
          name: 'Meg',
          avatar: 'avatars:svg-12',
        },
        dueDate: new Date(),
      }],
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
