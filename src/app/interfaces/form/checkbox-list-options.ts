import { FormArray, FormControl } from "@angular/forms";

export interface FormChunkOptions {
    formArray?: FormArray<FormControl<any>>; 
    formControl?: FormControl<any>;
    options?: Array<CheckBoxData>; 
    title?: string;
    isNumericValue?: boolean;
    placeholder?: string;
    inputType?: string;
    soloInputType?: string;
}