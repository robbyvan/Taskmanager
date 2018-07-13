import { Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';
import 'rxjs/add/operator/take';

@Directive({
  selector: '[appDroppable][dropTags][dragEnterClass]'
})
export class DropDirective {

  @Output() dropped = new EventEmitter<DragData>();
  @Input() dragEnterClass: string;
  @Input() dropTags: string[] = [];
  private data$;

  constructor(
    private el: ElementRef, 
    private rd: Renderer2, 
    private service: DragDropService
  ) {
    this.data$ = this.service.getDragData().take(1);
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.el.nativeElement === e.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.el.nativeElement === e.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(e, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(e, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(e, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(e, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.el.nativeElement === e.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (this.el.nativeElement === e.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }

}
