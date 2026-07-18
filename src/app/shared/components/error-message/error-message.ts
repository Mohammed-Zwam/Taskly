import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  template: `
    <p class="err-message gap-2 flex-center w-fit">
      <img class="w-4 h-4" src="/images/error-message.png" alt="" />
      <span>{{ errorMessage }}</span>
    </p>

`
})
export class ErrorMessage {
  @Input() errorMessage: string = '';
}
