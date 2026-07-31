import { SessionService } from './../../../features/auth/services/session.service';
import { Component, HostListener, signal } from '@angular/core';
import { SideNavbar } from "../../../shared/components/side-navbar/side-navbar";
import { RouterOutlet } from '@angular/router';
import { User } from '../../../features/auth/model/auth.model';
import { BottomNavbar } from "../../../shared/components/bottom-navbar/bottom-navbar";
import { getAvatar } from '../../utils/helpers';

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
      this.userTitle = user.department;
      this.avatar = getAvatar(user.name);
    }
  }
  userName: string = "Rafiq User";
  userTitle: string = "Rafiq Developer";
  avatar: string = "ru";
  isSideAppear = signal<boolean>(false);

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1024) this.isSideAppear.set(false);
  }
}
