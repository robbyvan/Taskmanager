import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../domain/user.model';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {

  myControl: FormControl = new FormControl();
  members: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<InviteComponent>,
  ) { }

  ngOnInit() {
    this.members = [ ...this.data.members ];
  }

  onSubmit(e: Event, { value, valid }) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }

}
