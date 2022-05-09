﻿/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { FormInput } from "../schema/form-input";

export class TypeAhead extends FormInput<string> {
  controlType = "typeahead";
  createVariable?: Function;
}

