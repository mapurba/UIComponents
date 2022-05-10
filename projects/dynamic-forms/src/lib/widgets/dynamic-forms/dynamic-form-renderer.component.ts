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

  @Input() inputsField: FormInput<string>;
  @Output() inputFieldsChange?: EventEmitter<any> = new EventEmitter<any>();
  @Input() form: FormGroup;
  @Input() inlineFormElements?: boolean = false;
  // get isValid() {
  //   let value = this.form?.controls[this.inputsField.key].value, isvalid = true;
  //   if (this.inputsField.validate != undefined) {
  //     this.inputsField.validate.forEach((fun) => {
  //       let { valid, errorMsg } = fun(value);
  //       this.inputsField['errorMsg'] = errorMsg;
  //       if (!valid) {
  //         this.form.controls[this.inputsField.key].setErrors({ 'errorMsg': true });
  //         isvalid = false;
  //       }
  //     });
  //   }

  //   return this.form.controls[this.inputsField.key].valid && isvalid;
  // }

  get isTouched() {
    return this.form?.controls[this.inputsField.key].touched;
  }

  get isValid() {
    return this.form?.controls[this.inputsField.key].valid;
  }
  get isDirty() {
    return this.form?.controls[this.inputsField.key].dirty;
  }

  get formField(): FormControl {
    return this.form?.controls[this.inputsField.key] as FormControl;
  }

  public errs() { return this.form?.controls[this.inputsField.key].getError('errorMsg'); }

  public valueInput(value) {

    if (this.form.controls[this.inputsField.key].valid && value) {
      this.form.controls[this.inputsField.key].setValue(value);
      this.form.controls[this.inputsField.key].markAsTouched();
    }
  }

  currentFormFieldValue() { return this.form.controls[this.inputsField.key].value; }

  ngOnInit(): void {

    this.form?.controls[this.inputsField.key].valueChanges.subscribe((res) => {
      this.form.valid && (this.form.touched || this.form.dirty) ? this.inputFieldsChange.emit(this.inputsField) : false;
    });
  }


  setSelected() {

  }
  print(val) {
    console.log(val);
  }






}


