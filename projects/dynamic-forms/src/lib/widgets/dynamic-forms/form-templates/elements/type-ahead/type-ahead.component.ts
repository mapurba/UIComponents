import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadKeyService } from '@ux-aspects/ux-aspects';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { VariableService } from '../../../../utils/Variable.service';
import { FormInput } from '../../../schema/form-input';
import { TypeAhead } from '../../typeAhead';

@Component({
  selector: 'type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeAheadComponent),
      multi: true
    }
  ],
})
export class TypeAheadComponent implements AfterViewInit, OnInit, ControlValueAccessor {
  @Output('valueChange') valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input('form') form?: FormGroup;
  @Input('type') type?: string;
  @Input('inputField') inputField?: TypeAhead;
  @Input('values') values: Array<any> = [];
  @Input('value')

  _value: any = '';

  set value(val) {
    this._value = val;
    this.valueChange.emit(val);

  }
  get value() {
    return this._value;
  }


  disable: boolean = false;
  dropdownOpen: boolean = false;
  selectOnEnter: boolean = true;
  dropDirection: 'auto' | 'up' | 'down' = 'down';
  selectFirst: boolean = false;
  recentOptions: ReadonlyArray<any>;
  recentOptionsMaxCount: number = 5;

  loadOptionsFn = this.loadOptions.bind(this);


  /** Load the options and filter the them */
  loadOptions(pageNum: number, pageSize: number, filter: any): Promise<ReadonlyArray<{ id, name }>> {

    try {
      let filterString = filter?.name || filter?.id || filter || '';
      this.value = filterString;
      filter = this.value;

      this.changeDetector.detectChanges();
      const values = this.values.filter(({ id, name, value }) => {
        if (this.value == '') return true;
        if (this.value)
          return (id.toLowerCase().indexOf(this.value.toLowerCase()) !== -1) || name.toLowerCase().indexOf(this.value.toLowerCase()) !== -1 || (value.toLowerCase().indexOf(this.value.toLowerCase()) !== -1);
      })
        .map(({ id, name, value }) => { return { id, name, value } })
        .slice(pageNum * pageSize, (pageNum + 1) * pageSize);
      return of(values).pipe(delay(100)).toPromise();
    }
    catch (e) {
      of([]).pipe(delay(100)).toPromise();
    }


    // return the values after a delay to simulate server response time
  }

  constructor(public typeaheadKeyService: TypeaheadKeyService<string>, private changeDetector: ChangeDetectorRef) {


  }

  writeValue(value: any): void {
    this._value = value;
    // setTimeout(() => {
    //   this.dropdownOpen = false;
    // }, 0);
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }


  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  propagteChange(value: any) {
    this.valueChange.emit(value?.id);
  }

  ngAfterViewInit() {
    this.dropdownOpen = false;
    this.changeDetector.detectChanges();

  }

  async createVariable() {
    let value;
    if (!VariableService.isUndefinedOrNull(this.form.controls['displayName'])) {
      if (this.inputField.createVariable) {
        value = await this.inputField.createVariable(this._value, this.form.controls['displayName'].value, this.inputField.key);
      } else {
        value = await VariableService.convertVariable(this._value, this.form.controls['displayName'].value, this.inputField.key);
      }
    }
    else {
      if (this.inputField.createVariable) {
        value = await this.inputField.createVariable(this._value, this.inputField.key, "-" + VariableService.S4());
      } else {
        value = await VariableService.convertVariable(this._value, this.inputField.key, "-" + VariableService.S4());
      }
    }
    this._value = value;
  }

  keyfind(val: any): string {
    return val.id;
  }

  getDisplay(val: any): string {
    return val?.name;
  }

}
