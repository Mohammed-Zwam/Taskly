import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { ErrorMessage } from "../../../../shared/components/error-message/error-message";

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './input-field.html',
})
export class InputField {
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() note: string = '';
  @Input() type!: string;
  @Input() name!: string;
  @Input() inputControl!: FormControl;


}
