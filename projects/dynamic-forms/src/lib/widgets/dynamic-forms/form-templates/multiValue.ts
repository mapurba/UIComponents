/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { FormInput } from "../schema/form-input";

export class MultiValue extends FormInput<string> {
  controlType = 'multivalue';
  
}




// new MultiValue({
//   key: "Users",
//   label: "Users",
//   type: "multivalue",
//   required: false,
//   value: [],
//   form: [new TextboxWithEditor({
//       key: "name",
//       label: "Name",
//       type: "textboxWithEditor",
//       required: true,
//       value: '',
//       onChange: () => { (form)=>{form.controls['ss']..}},
//       onOpenExpBuilder: this.propertiesPanelService.openExpBuilder(element, 'name', () => { }),
//       onExpBuilderSave: () => { }
//   }),
//   new TextboxWithEditor({
//       key: "mobile",
//       label: "Mobile",
//       type: "textboxWithEditor",
//       required: true,
//       value: '',
//       onChange: () => { },
//       onOpenExpBuilder: this.propertiesPanelService.openExpBuilder({}, 'mobile', () => { }),
//       onExpBuilderSave: () => { }
//   })],
//   onChange: () => { }
// }),