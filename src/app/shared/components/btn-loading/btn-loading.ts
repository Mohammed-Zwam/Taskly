import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-loading',
  imports: [],
  template: `
      <div class="w-5 h-5 rounded-full border-3 border-[{{loadingColor}}] border-l-transparent animate-spin"></div>
  `
})
export class BtnLoading {
  @Input() loadingColor: string = 'white';
}
