/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormRendererComponent } from './dynamic-forms/dynamic-form-renderer.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeAheadComponent } from './dynamic-forms/form-templates/elements/type-ahead/type-ahead.component';
import { AceEditorComponent } from './ace-editor/ace-editor.component';
import { CheckboxModule, SelectionModule, SelectModule, TableModule, TypeaheadModule } from '@ux-aspects/ux-aspects';

@NgModule({
  declarations: [
    AceEditorComponent,
    TypeAheadComponent,
    DynamicFormRendererComponent,
    DynamicFormsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    TypeaheadModule,
    CheckboxModule,
    SelectionModule,
    TableModule
  ],
  exports: [
    AceEditorComponent,
    DynamicFormsComponent,
    TypeAheadComponent,
    DynamicFormRendererComponent,
  ]
})
export class DynamicFormModule { }
