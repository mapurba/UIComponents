/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VariableService } from '../utils/Variable.service';
import { FormInput } from './schema/form-input';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class DynamicFormsControlService {
  constructor() { }

  public toFormGroup(formItems: FormInput<string>[], disabled = false) {
    const group: any = {};

    formItems.forEach((form: any) => {
      if (disabled)
        form.disabled = disabled
      form.guid = VariableService.S4();
      if (form?.controlType == "multivalue") {
        let defaultValue = [];
        form?.value?.forEach(element => {
          defaultValue.push(this.addControls(form.key, formItems))
        });
        group[form.key] = new FormArray(defaultValue || []);
        group[form.key].patchValue(form.value || {});
      }
      else if (form.controlType == "layout") {
        form.form.forEach(element => {
          if (!element) return;
          if (element?.required) element.validator = [Validators.required, ...form.validator || []];
          group[element.key] = (element?.validator?.length > 0) ? (new FormControl({ value: element.value, disabled: element?.disabled || false } || '', element.validator)) : (new FormControl({ value: element.value, disabled: element?.disabled || false } || ''));
        });
      }
      else {
        if (form?.required) form.validator = [Validators.required, ...form.validator || []];
        group[form.key] = (form?.validator?.length > 0) ? (new FormControl({ value: form.value, disabled: form?.disabled || false } || '', form.validator)) : (new FormControl({ value: form.value, disabled: form?.disabled || false } || ''));
        if (form.touched)
          group[form.key].markAsTouched();
      }
    });
    return new FormGroup(group);
  }

  public addControls(control: string, formItems: FormInput<string>[]) {
    let fields: any = formItems.find((q) => q.key == control);
    let form = fields ? fields.form : null;
    return this.toFormGroup(form);
    
  }

}


