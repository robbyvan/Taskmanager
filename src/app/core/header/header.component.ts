import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter<void>();
  @Output() darkThemeToggle = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggleMenu.emit();
  }

  onThemeChange(checked: boolean) {
    this.darkThemeToggle.emit(checked);
  }

}
