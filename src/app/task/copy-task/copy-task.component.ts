import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, ControlValueAccessor, Validators } from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {

  lists: any[];
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<CopyTaskComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.lists = this.data.lists;
    this.form = this.fb.group({
      targetListId: []
    });
  }

  onSubmit(e: Event, { value, valid }){
    e.preventDefault();
    if(!valid) {
      return;
    }
    this.dialogRef.close(value.targetListId);
  }

}
