import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEditProject = new EventEmitter<void>();
  @Output() onDelProject = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onEditProjectClick() {
    this.onEditProject.emit();
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onDelProjectClick() {
    this.onDelProject.emit();
  }

}
