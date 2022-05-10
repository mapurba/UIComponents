/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { FocusOrigin } from '@angular/cdk/a11y';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { VariableService } from '../utils/Variable.service';
import { DynamicFormsControlService } from './dynamic-forms-control.service';
import { FormInput } from './schema/form-input';

@Component({
  selector: 'dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
  providers: [DynamicFormsControlService]
})
export class DynamicFormsComponent implements OnInit, AfterViewChecked {

  public _inputFields: FormInput<string>[];
  @Input("inputFields")
  set inputFields(val: FormInput<string>[]) {
    this._inputFields = val;
    this.form = this.dfcs.toFormGroup(this._inputFields, this.disabled);

    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.form.valid ? this.isFormValid.emit(true) : this.isFormValid.emit(false);
    this.form.valid ? this.emitFormCurrentEvent() : false;
  }
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() currentValue?: EventEmitter<any> = new EventEmitter<any>();
  @Output() statusEvent?: EventEmitter<any> = new EventEmitter<any>();
  @Output() isFormValid?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() hideSubmit: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() inlineFormElements?: boolean = false;
  @Input() virtualScroller?: boolean = false;
  @Input() form?: FormGroup;
  @ViewChild('formdiv') formdiv: ElementRef;

  setinlineForm = false;

  // multiValue form selection
  selection: any[] = [];
  payLoad = '';
  selectedKey: any;

  constructor(private dfcs: DynamicFormsControlService, private _ngZone: NgZone, private _cdr: ChangeDetectorRef) {

  }


  ngAfterViewChecked() {
    if (this.formdiv?.nativeElement?.offsetWidth == 0 || !this.inlineFormElements) return;

    if (this.formdiv?.nativeElement?.offsetWidth <= 800) {
      this.setinlineForm = false
    } else {
      this.setinlineForm = true;
    }
  }

  // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
  markForCheck() {
    this._ngZone.run(() => this._cdr.markForCheck());
  }

  ngOnInit() {
    this.form = this.dfcs.toFormGroup(this._inputFields, this.disabled);
    this.setinlineForm = this.inlineFormElements;
  }

  submit(form) {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    if (this.form?.valid && (this.form.touched || this.form.dirty)) { this.isFormValid.emit(true); this.onSubmit.emit(this.payLoad); }
  }


  emitFormCurrentEvent() {
    this.currentValue.emit(this.payLoad);
  }



  clearData() {
    this.form = this.dfcs.toFormGroup(this._inputFields, this.disabled);
  }
  addControls(control: string) {
    if (!this.form.get(control).valid) return;
    let field: any = this._inputFields.find((field) => field.key == control);
    let form = field ? field.form : null;
    form.map((field) => {
      field.value = '';
      field.order = (this.form.get(control) as FormArray).length;
    })
    if (form)
      (this.form.get(control) as FormArray).push(this.dfcs.toFormGroup(form));
  }
  removeControls(control: string, index) {
    let array = this.form.get(control) as FormArray;
    array.removeAt(index);
  }

  removeMultipleControls(control: string) {
    if (this.selection.length <= 0) return;
    let array = this.form.get(control) as FormArray;
    this.selection.map((item) => {
      array.removeAt(item.i);
    });
  }


  emitChangeEvent(event) {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.form.valid ? this.isFormValid.emit(true) : this.isFormValid.emit(false);
    this.form.valid && this.form.touched ? this.emitFormCurrentEvent() : false;
  }

  getFormConrtols(key) {
    return Array.from(this.form.get(key)['controls']);
  }
  print(val) {
    console.log(val);
  }
}

// class CustomSelection extends SelectionStrategy {
//   constructor(private _ngZone: NgZone, private _cdr: ChangeDetectorRef) {
//     super();
//   }
//   onChange(event) {
//     this._ngZone.run(() => this._cdr.markForCheck());
//   }
//   click(event: MouseEvent, data: any): void {

//   }
// }