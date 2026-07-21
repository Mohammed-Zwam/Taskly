import { SessionService } from './../../../features/auth/services/session.service';
import { Component, HostListener, signal } from '@angular/core';
import { SideNavbar } from "../../../shared/components/side-navbar/side-navbar";
import { RouterOutlet } from '@angular/router';
import { User } from '../../../features/auth/model/auth.model';
import { BottomNavbar } from "../../../shared/components/bottom-navbar/bottom-navbar";

@Component({
  selector: 'app-user-layout',
  imports: [SideNavbar, RouterOutlet, BottomNavbar],
  templateUrl: './user-layout.html',
})
export class UserLayout {
  constructor(private sessionService: SessionService) {
    const user: User | any = sessionService.getUser();
    if (user != null) {
      this.userName = user.name;
      this.userTitle = user.title;
      const userNames = user.name.split(' ');
      this.avatar = userNames[0] + userNames[1];
    }
  }
  userName: string = "Zwam Rafiq";
  userTitle: string = "Front-end Developer";
  avatar: string = "zr";
  isSideAppear = false;

  @HostListener('window:resize')
  onResize() {
    if(window.innerWidth >= 640) this.isSideAppear = false;
  }
}
