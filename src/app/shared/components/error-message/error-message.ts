import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  template: `
    <p class="err-message gap-1 flex w-fit">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="darkred" class="size-4 mt-1">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>




      <span>{{ errorMessage }}</span>
    </p>

`
})
export class ErrorMessage {
  @Input() errorMessage: string = '';
}
