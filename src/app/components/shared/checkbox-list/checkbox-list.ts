import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxListOptions } from '../../../interfaces/form/checkbox-list-options';
import { FormType } from '../../../enum/form-type.enum';

@Component({
  selector: 'checkbox-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox-list.html',
  styleUrl: './checkbox-list.css'
})
export class CheckboxList {
  @Input() checkboxListOptions!: CheckboxListOptions;
  @Input() formType!: FormType;

  public FormTypeEnum = FormType;

  public dropdownOpen: boolean = false;

  get controls(): Array<FormControl> {
    return this.checkboxListOptions.formArray!.controls as Array<FormControl>;
  }

  public toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}