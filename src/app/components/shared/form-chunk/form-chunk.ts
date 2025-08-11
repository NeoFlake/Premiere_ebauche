import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormChunkOptions } from '../../../interfaces/form/checkbox-list-options';
import { FormType } from '../../../enum/form-type.enum';

@Component({
  selector: 'form-chunk',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-chunk.html',
  styleUrl: './form-chunk.css'
})
export class FormChunk {
  @Input() checkboxListOptions!: FormChunkOptions;
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