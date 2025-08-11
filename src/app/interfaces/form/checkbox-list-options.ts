import { FormArray, FormControl } from "@angular/forms";

export interface CheckboxListOptions {
    formArray?: FormArray<FormControl<any>>; 
    formControl?: FormControl<any>;
    options?: Array<CheckBoxData>; 
    title?: string;
    isNumericValue?: boolean;
    placeholder?: string;
    inputType?: string;
}