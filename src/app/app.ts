import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from "./shared/components/toast/toast";
import { Loader } from "./shared/components/loader/loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Taskly');
}
