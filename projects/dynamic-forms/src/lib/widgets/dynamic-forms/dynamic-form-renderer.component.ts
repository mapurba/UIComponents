/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormInput } from './schema/form-input';

@Component({
  selector: 'form-renderer',
  templateUrl: './dynamic-form-renderer.component.html',
  styleUrls: ['./dynamic-form-renderer.component.scss']
})
export class DynamicFormRendererComponent implements OnInit {

  @Input() inputField: FormInput<string>;
  @Output() inputFieldChange?: EventEmitter<any> = new EventEmitter<any>();
  @Input() form: FormGroup;
  @Input() inlineFormElements?: boolean = false;

  get isTouched() {
    return this.form?.controls[this.inputField.key].touched;
  }

  get isValid() {
    return this.form?.controls[this.inputField.key].valid;
  }
  get isDirty() {
    return this.form?.controls[this.inputField.key].dirty;
  }

  get formField(): FormControl {
    return this.form?.controls[this.inputField.key] as FormControl;
  }

  public errs() { return this.form?.controls[this.inputField.key].getError('errorMsg'); }

  public valueInput(value) {

    if (this.form.controls[this.inputField.key].valid) {
      this.form.controls[this.inputField.key].setValue(value);
      this.form.controls[this.inputField.key].markAsTouched();
    }
  }

  currentFormFieldValue() { return this.form.controls[this.inputField.key].value; }

  ngOnInit(): void {

    this.form?.controls[this.inputField.key].valueChanges.subscribe((res) => {
      this.form.valid && (this.form.touched || this.form.dirty) ? this.inputFieldChange.emit(this.inputField) : false;
    });
  }


  setSelected() {

  }


}


