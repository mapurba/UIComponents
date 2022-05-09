/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { Injectable } from '@angular/core';
import { CheckBox } from '../dynamic-forms/form-templates/checkbox';
import { Dropdown } from '../dynamic-forms/form-templates/dropdown';
import { MultiValue } from '../dynamic-forms/form-templates/multiValue';
import { TextArea } from '../dynamic-forms/form-templates/textArea';
import { Textbox } from '../dynamic-forms/form-templates/textbox';
import { FormInput } from '../dynamic-forms/schema/form-input';

@Injectable()
export class VariableService {

  public static dateFormat = 'lll';
  public static dateFormatDateOnly = 'll';

  constructor(

  ) { }

  public static isUndefined(x) {
    return x == undefined;
  }

  public static isNull(x) {
    return x == null;
  }

  public static isUndefinedOrNull(x) {
    return this.isUndefined(x) || this.isNull(x);
  }

  public static isEmptyString(x) {
    if (this.isUndefinedOrNull(x)) {
      return true;
    }
    return x == "";
  }

  public static equals(x, y) {
    if (this.isUndefinedOrNull(x) || this.isUndefinedOrNull(y)) {
      return false;
    }
    return x == y;
  }

  public static isDefinedPositiveNumber(x) {
    if (this.isUndefinedOrNull(x)) return false;
    return typeof (x) == "number" && x > -1;
  }

  public static isEmptyArray(x) {
    if (this.isUndefinedOrNull(x)) {
      return true;
    } else {
      return x.length === 0;
    }
  }

  public static isArray(x) {
    if (!this.isUndefined(x) && !this.isNull(x)
      && !this.isUndefined(x.constructor) && x.constructor == Array) {
      return true;
    } else {
      return false;
    }
  }

  public static isBoolean(x) {
    if (!this.isUndefined(x) && !this.isNull(x)
      && !this.isUndefined(x.constructor) && x.constructor == Boolean) {
      return true;
    } else {
      return false;
    }
  }



  public static sortArrayByAttribute(attr) {
    return function (a, b) {
      if (+a[attr] > +b[attr]) {
        return 1;
      } else if (+a[attr] < +b[attr]) {
        return -1;
      }
      return 0;
    }
  }

  // Convert array to object
  public static convArrToObj(array) {
    var thisEleObj = new Object();
    if (typeof array == "object") {
      for (var i in array) {
        var thisEle = this.convArrToObj(array[i]);
        thisEleObj[i] = thisEle;
      }
    } else {
      thisEleObj = array;
    }
    return thisEleObj;
  }

  public static stringify(input) {
    if (JSON.stringify(input) == '[]')
      return JSON.stringify(this.convArrToObj(input));
    else
      return JSON.stringify(input);
  }


  public static checkForValidFileName(str) {
    var validMatchPattern = /^[A-Za-z0-9. _-]*$/;
    return str.match(validMatchPattern);
  };

  public static S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  public static guid() {
    return (VariableService.S4() + VariableService.S4() + "-" + VariableService.S4() + "-" + VariableService.S4() + "-" + VariableService.S4() + "-" + VariableService.S4() + VariableService.S4() + VariableService.S4());
  };



  public static generateNestedForms(types): FormInput<any>[] {
    let fields = [{ ...types.key }, { ...types.value, type: types.value.items.type }];
    return fields.map((field, index) => {
      switch (field.type) {
        case 'String': {
          return new Textbox({
            key: field?.label.replace(/\s/g, ''),
            label: field?.label || field?.id,
            labelHidden: true,
            type: 'text',
            required: true,
            value: '',
          });
        }
        case 'default': {
          return new Textbox({
            key: field?.label.replace(/\s/g, ''),
            label: field?.label || field?.id,
            labelHidden: true,
            type: 'text',
            required: true,
            value: '',
          });
        }
      }
    });
  }

  public static transformNestedValues(defaultValue, types): any[] {
    let fields = [{ key: types.key.label.replace(/\s/g, '') }, { key: types.value.label.replace(/\s/g, '') }];
    let transDefaultValue = [].concat(...Object.entries(defaultValue).map(([key, value]) => {
      let dvalue: any = value;
      if (dvalue.length > 1) {
        let list = [];
        list = dvalue.map((values) => {
          let tempobj = {};
          tempobj[fields[0].key] = key;
          tempobj[fields[1].key] = values;
          return tempobj;
        });

        return [...list];
      }
      else {
        let tempobj = {};
        tempobj[fields[0].key] = key;
        tempobj[fields[1].key] = value[0];
        return tempobj;
      }
    }));
    return transDefaultValue;
  }

  public static createForm(value) {
    let fields = [];
    try {
      fields = Object.entries(value).filter((fields: any) => {
        let field = { id: fields[0], ...fields[1] };
        if (field.type === "separator") return false;
        return true;
      }).map((fields: any) => {
        let field = { id: fields[0], ...fields[1] };

        switch (field.type) {
          case 'String': {
            return new Textbox({
              key: field?.id,
              label: field?.label || field?.id,
              type: 'text',
              required: false,
              hidden: field?.hidden || false,
              order: field?.order || '',
              value: field?.defaultValue || '',
            });
          }
          case 'Password': {
            return new Textbox({
              key: field?.id,
              label: field?.label || field?.id,
              type: 'password',
              required: false,
              value: field?.defaultValue || '',
            });
          }
          case 'boolean': {
            return new CheckBox({
              key: field?.id,
              label: field?.label,
              value: false,
              selected: false,
              required: false,
            });
          }
          case 'TextArea': {
            return new TextArea({
              key: field?.id,
              label: field?.label,
              value: field?.defaultValue,
              required: false,
            });
          }
          case 'select': {
            let [value] = Object.entries(field?.options).filter((value) => { return value[0].toString().toLowerCase() == field?.defaultValue.toString().toLowerCase() }).map(([id, name]) => { return { id: id, name: name } });
            return new Dropdown({
              key: field?.id,
              label: field?.label,
              value: value || { id: field?.defaultValue, name: field?.defaultValue } || '',
              type: 'dropdown',
              options: Object.entries(field?.options).map((value: any) => { return { id: value[0], name: value[1] } }),
              required: false,
            });
          }
          case 'HashMap': {
            return new MultiValue({
              key: field?.id,
              label: field?.label,
              value: field?.defaultValue ? VariableService.transformNestedValues(field?.defaultValue, field?.properties) : [],
              selected: false,
              required: false,
              form: VariableService.generateNestedForms(field?.properties)
            });
          }
          default: {
            return new Textbox({
              key: field?.id,
              label: field?.label || field?.id,
              type: 'text',
              hidden: field?.hidden || false,
              required: false,
              value: field?.defaultValue || '',
            })
          }
        }
      });
    }
    catch (e) {
      console.error(e);
      return [];
    }

    fields = fields.sort((a, b) => a.order - b.order);
    return fields;
  }


  // public static dateFormatterWithFormat(dateString, format, local) {
  //   if (!VariableService.isEmptyString(dateString) && !VariableService.isEmptyString(format)) {
  //     let date: Date = new Date(+dateString);
  //     return moment(date).locale(local).format(format);
  //   } else {
  //     return "";
  //   }
  // };

  public static dateFormatter(dateString, local) {
    // return this.dateFormatterWithFormat(dateString, VariableService.dateFormat, local);
  };



  /**
   * convertNametoCase
   * @param name 
   * @returns 
   */
  public static convertNametoCase(name: string) {
    return name.trim()  //might need polyfill if you need to support older browsers
      .toLowerCase()  //lower case everything
      .replace(/([^A-Z0-9_-]+)(.)/ig, //match multiple non-letter/numbers followed by any character
        function (match) {
          return arguments[2].toUpperCase();  //3rd index is the character we need to transform uppercase
        }
      );
  }


  public static convertVariable(arg0: any, connectionName: string, attributeName: string): string {
    let value = arg0;
    let variableName = connectionName + " " + attributeName;
    variableName = VariableService.convertNametoCase(variableName);
    if (typeof arg0 === 'string') {
      if (arg0.startsWith('${')) return value;
      else {
        return '${' + variableName + '}';
      }
    }
    return value;
  }

}
