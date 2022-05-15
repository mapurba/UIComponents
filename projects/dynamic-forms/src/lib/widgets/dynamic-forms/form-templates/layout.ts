﻿/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/

import { FormInput } from "../schema/form-input";

export class Layout extends FormInput<string> {
  controlType = this.controlType || 'layout';
}

