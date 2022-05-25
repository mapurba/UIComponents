# UIComponents

#Demo
https://dynamic-components.github.io/#/dynamic-forms/all


#Install 
```
npm i @netiq/dynamic-forms 
```



#Simple Dynamic forms.

# Form json

 ```  import { Component, OnInit } from '@angular/core';
  import { TextArea, Textbox } from 'dynamic-forms';
  
  export class FormsComponent implements OnInit {

    inputfields: any[] = [
      new Textbox({
        key: "Name",
        label: "Name",
        type: "text",
        value: '',
        required: true,
      }),
      new TextArea({
        key: "Discription",
        label: "Description",
        type: "text",
        value: '',
        required: false,
      })
    ];
    
    submit(value: string) {
      console.log(JSON.parse(value));
    }
  }
``` 

 
  # Template
```
<dynamic-forms [inputFields]="inputfields" (submit)="submit($event)">
  <div class=" btn-container m-t-md">
    <button type="submit" class="btn-primary btn">
      Save
    </button>
    <button type="button" class="js-details-target btn">
      Cancel
    </button>
  </div>
</dynamic-forms>
```

#module 
```
import { DynamicFormModule } from 'dynamic-forms';

  imports: [
    DynamicFormModule 
  ],
```
