/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { VariableService } from '../utils/Variable.service';
import { FormInput } from './schema/form-input';

@Component({
  selector: 'form-renderer',
  templateUrl: './dynamic-form-renderer.component.html',
  styleUrls: ['./dynamic-form-renderer.component.scss']
})
export class DynamicFormRendererComponent implements OnInit {

  @Input() inputField: FormInput<any> | any;
  @Output() inputFieldChange?: EventEmitter<any> = new EventEmitter<any>();
  @Input() form: FormGroup;
  @Output() isFormValid?: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    try {
      this.form.get(this.inputField.key).valueChanges.subscribe((data) => {
        if (this.form.get(this.inputField.key).valid && (this.form.get(this.inputField.key).touched || this.form.get(this.inputField.key).dirty)) {
          this.inputFieldChange.emit(this.inputField);
        }
        this.emitIsFormValid();
      });
    } catch (e) { }
  }


  setSelected() {

  }


  emitIsFormValid() {
    this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    if (this.hasErrors()) {
      this.isFormValid.emit(false);
    }
    this.isFormValid.emit(this.form.valid);
  }

  getErrors(): string {
    const controlErrors: ValidationErrors = this.form.get(this.inputField?.key).errors;
    if (controlErrors != null) {
      let errorList = Object.keys(controlErrors).map(keyError => {
        return controlErrors[keyError].message || `Required - valid ${this.inputField?.label}`;
      });
      return errorList[0];
    }
    return '';
  }

  hasErrors(): Boolean {
    const controlErrors: ValidationErrors = this.form.get(this.inputField?.key).errors;
    return (controlErrors != null) ? true : false;
  }


}


