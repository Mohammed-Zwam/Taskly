import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

interface NavItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-nav-list',
  imports: [RouterLink],
  templateUrl: './nav-list.html',
  styleUrl: './nav-list.css',
})
export class NavList {
  @Input() navItems: NavItem[] = [];
}
