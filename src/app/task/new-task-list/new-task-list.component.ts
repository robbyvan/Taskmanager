import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ControlValueAccessor, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  form: FormGroup;
  title = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewTaskListComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [this.data.taskList? this.data.taskList.name : '', Validators.required],
    });
  }

  onClick() {
    this.dialogRef.close(this.title);
  }

  onSubmit({ value, valid }) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
