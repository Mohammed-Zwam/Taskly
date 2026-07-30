import { NgClass } from '@angular/common';
import { Component, computed, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.html',
})
export class Pagination {

  @Input() currentPage!: WritableSignal<number>;
  @Input() totalProjectsCount!: WritableSignal<number>;
  @Input() limit!: number;
  @Input() totalPages = computed(() =>
    Math.ceil(this.totalProjectsCount() / this.limit)
  );


  getPages(): (number | string)[] {
    const current = this.currentPage();
    const total = this.totalPages();

    if (total <= 6) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, "...", total];
    }

    if (current >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current, current + 1, "...", total];
  }


  next() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  selectPage(pageNumber: number | string) {
    if (pageNumber !== '...') {
      this.currentPage.set(Number(pageNumber));
    }
  }

  previous() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
