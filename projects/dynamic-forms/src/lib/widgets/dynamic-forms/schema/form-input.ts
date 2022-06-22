/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

export class FormInput<T> {
  value: any;
  key: any;
  label?: string;
  labelHidden?: boolean;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  icon?: string;
  hidden?: boolean;
  enableIcon?: boolean;
  iconPrefix?: string;
  classNames?: string;
  options: { id: string; name: string }[];
  dropDown: { multi?: boolean, size: number, flat?: boolean };
  validator?: any[];
  selected?: boolean;
  disabled?: boolean;
  browserChildFlag?: boolean;
  notVisible?: boolean;
  errorMsg?: string;
  createVariable?: any;
  selection?: any[];
  actionButtons?: ActionButtons[];

  /**
  * if multivalue is true then the forms input is required  
  * cases:
  * if only one input inline editable 
  * else if the form contains more than one entries popup with nesed forms.
  * 
  */
  multiValue?: boolean;
  /**
   * Nested Forms and condition for the field 
   * required for each form element or multivalue input 
   */
  form?: FormInput<any>[];



  showIfTheValueIs?: any;
  constructor(
    options: {
      value?: any;
      key?: any;
      label?: string;
      labelHidden?: boolean;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      hidden?: boolean;
      iconPrefix?: string;
      enableIcon?: boolean;
      classNames?: string;
      options?: { id: any; name: string }[];
      icon?: string;
      dropDown?: { multi: boolean, size: number, flat?: boolean };
      validator?: any[];
      showIfTheValueIs?: any;
      errorMsg?: any;
      multiValue?: boolean;
      form?: FormInput<any>[];
      disabled?: boolean;
      selected?: boolean;
      notVisible?: boolean;
      createVariable?: any;
      selection?: any[];

    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || "";
    this.label = options.label || "";
    this.labelHidden = options.labelHidden || false;
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || "";
    this.type = options.type || "";
    this.options = options.options || [];
    this.icon = options.icon;
    this.hidden = options.hidden || false;
    this.iconPrefix = options.iconPrefix || '';
    this.enableIcon = options.enableIcon || false;
    this.classNames = options.classNames || '';
    this.dropDown = options.dropDown;
    this.validator = options.validator;
    this.showIfTheValueIs = options.showIfTheValueIs;
    this.errorMsg = options.errorMsg;
    this.multiValue = options.multiValue;
    this.form = options.form || null;
    this.selected = options.selected || false;
    this.disabled = options.disabled || false;
    this.notVisible = options.notVisible || false;
    this.createVariable = options.createVariable || null;
    this.selection = options.selection || null;
  }
}



export class ActionButtons {
  name: string;
  className: string;
  callBack: [];
  disabled: boolean;
  hidden: boolean;
}