import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEditProject = new EventEmitter<void>();
  @Output() onDelProject = new EventEmitter<void>();
  @Output() onSelected = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  
  constructor() { 
  }

  ngOnInit() { }

  onClick() {
    this.onSelected.emit();
  }

  @HostListener('mouseenter')
  onMouseEnter(e: Event) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave(e: Event) {
    this.cardState = 'out';
  }

  onEditProjectClick(e: Event) {
    e.stopPropagation();
    this.onEditProject.emit();
  }

  onInviteClick(e: Event) {
    e.stopPropagation();
    this.onInvite.emit();
  }

  onDelProjectClick(e: Event) {
    e.stopPropagation();
    this.onDelProject.emit();
  }

}
