/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/


import { ActionButtons, FormInput } from "../schema/form-input";

export class TagInput extends FormInput<any> {
    controlType = "tagInput";
    showTypeaheadOnClick?: boolean = false;
    enableTypeahead?: boolean = false;
    enforceTagLimits?: boolean = false;
    minLength?: number = 1;
    maxLength?: number = 10;
    tagDelimiters?: string = '';
    placeholder?: string = 'Enter a value...';
    freeInput?: boolean = true;
    input?: any;
    multiselectable?: boolean = false;
    constructor(
        options: {
            value: any;
            key: any;
            label?: string;
            labelHidden?: boolean;
            required?: boolean;
            order?: number;
            hidden?: boolean;
            iconPrefix?: string;
            classNames?: string;
            options?: any;
            icon?: string;
            validator?: any[];
            errorMsg?: any;
            disabled?: boolean;
            actionButtons?: ActionButtons[];
            showTypeaheadOnClick?: boolean;
            enableTypeahead?: boolean;
            maxLength?: number;
            minLength?: number;
            freeInput?: boolean;
            tagDelimiters?: string;
            enforceTagLimits?: boolean;
            multiselectable?: boolean;
            placeholder?: string;
            input?: any;
        }
    ) {
        super(options);
        this.value = options.value;
        this.key = options.key || "";
        this.label = options.label || "";
        this.labelHidden = !!options.labelHidden
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.options = options.options || [];
        this.icon = options.icon;
        this.hidden = !!options.hidden
        this.iconPrefix = options.iconPrefix || '';
        this.classNames = options.classNames || '';
        this.validator = options.validator;
        this.errorMsg = options.errorMsg;
        this.disabled = !!options.disabled
        this.actionButtons = options.actionButtons || null;
        this.showTypeaheadOnClick = !!options.showTypeaheadOnClick;
        this.enableTypeahead = !!options.enableTypeahead;
        this.maxLength = options.maxLength || 10;
        this.minLength = options.minLength || 0;
        this.freeInput = !!options.freeInput
        this.tagDelimiters = options.tagDelimiters;
        this.enforceTagLimits = !!options.enforceTagLimits;
        this.multiselectable = !!options.multiselectable;
        this.placeholder = options.placeholder || options.label;
        this.input = options.input || [];

    }
}

