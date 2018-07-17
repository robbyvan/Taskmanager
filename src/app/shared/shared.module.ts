import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatButtonToggleModule,
  // MatButtonToggleGroup,
} from '@angular/material';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    DirectiveModule,
    MatButtonToggleModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    DirectiveModule,
    MatButtonToggleModule,
    ImageListSelectComponent,
    AgeInputComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent
  ],
})
export class SharedModule { }
