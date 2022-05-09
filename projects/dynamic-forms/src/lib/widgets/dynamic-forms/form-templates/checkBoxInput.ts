/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

import { FormInput } from "../schema/form-input";



export class CheckBoxInput extends FormInput<any> {
    controlType = "checkboxInput";
    inputKey: string;
    inputValue: string;
    showInputField: boolean = false;

}


