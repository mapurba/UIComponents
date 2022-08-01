/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { debounce, interval, Subject, } from 'rxjs';
import { DynamicFormsControlService } from './dynamic-forms-control.service';
import { FormInput } from './schema/form-input';

@Component({
  selector: 'dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.scss'],
  providers: [DynamicFormsControlService]
})
export class DynamicFormsComponent implements OnInit, AfterViewChecked {

  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() currentValue: EventEmitter<any> = new EventEmitter<any>();
  @Output() isFormValid?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() hideSubmit: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() inlineFormElements?: boolean = false;
  @Input() virtualScroller?: boolean = false;
  @Input() form?: FormGroup;
  @Input() debounce?: number = 100;
  @ViewChild('formdiv') formdiv: ElementRef;

  public _inputFields: FormInput<any>[];
  @Input("inputFields")
  set inputFields(val: FormInput<any>[]) {
    this._inputFields = val;
    this.form = this.dfcs.toFormGroup(this._inputFields, this.disabled);
    this.formValue.pipe(debounce(() => interval(this.debounce))).subscribe((value) => {
      this.currentValue.emit(JSON.stringify(this.form.getRawValue()))
    });
  }


  formValue: Subject<any> = new Subject<any>();
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
    this.formValue.next(this.payLoad);
  }


  getSelectAll(control: FormInput<any>): boolean | -1 {
    if (control?.selection?.length === 0) {
      return false;
    }
    if (control?.selection?.length === this.form.controls[control.key]['controls'].length) {
      return true;
    }
    return -1;
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
      field.touched = true;
      field.order = (this.form.get(control) as FormArray).length;
    })
    if (form)
      (this.form.get(control) as FormArray).push(this.dfcs.toFormGroup(form));
    this.emitChangeEvent(null);
  }

  removeControls(control: string, index) {
    let array = this.form.get(control) as FormArray;
    array.removeAt(index);
    this.emitChangeEvent(null);
  }

  removeMultipleControls(control: FormInput<any>) {
    if (control.selection.length <= 0) return;
    control.selection.sort((prev: any, cur: any) => { return cur.i - prev.i });
    const array = this.form.get(control.key) as FormArray;
    control.selection.map((item) => {
      array.removeAt(item.i);
    });
    control.selection = [];
    this.form.markAsDirty();
    this.emitChangeEvent(null);
  }


  emitChangeEvent(event) {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.form.valid ? this.isFormValid.emit(true) : this.isFormValid.emit(false);
    this.form.valid && (this.form.dirty || this.form.touched) ? this.emitFormCurrentEvent() : false;
  }

  getFormConrtols(key) {
    return Array.from(this.form.get(key)['controls']);
  }

  print(event) {
    console.log(event)
  }

}
