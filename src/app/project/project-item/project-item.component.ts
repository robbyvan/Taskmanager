import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim],
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEditProject = new EventEmitter<void>();
  @Output() onDelProject = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  
  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
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
