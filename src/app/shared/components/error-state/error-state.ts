import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-state',
  imports: [],
  templateUrl: './error-state.html',
})
export class ErrorState {

  @Input() takeAction !: Function;
}
