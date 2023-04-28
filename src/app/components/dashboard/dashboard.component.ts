import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { MatSidenav } from '@angular/material/sidenav';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { UserModalComponent } from './user-modal/user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { QuestionModalComponent } from './question-modal/question-modal.component';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { ChatModalComponent } from './chat-modal/chat-modal.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;
  screenSubscribtion: any;

  opened: boolean;

  constructor(
    private authService: AuthService,
    private checkScreen: ScreenSizeService,
    private dialog: MatDialog
  ) {
    this.opened = true;
  }

  ngOnInit() {
    // //check screen width and close sidebar on small screens
    this.screenSubscribtion = this.checkScreen
      .getOpened()
      .subscribe((val) => {
        this.opened = val;
      });
  }

  //logout User
  logOutUser() {
    this.authService.logout();
  }

  openQuestionDialog():void {
    this.dialog.open(QuestionModalComponent);
  }

  openUserDialog(): void {
    this.dialog.open(UserModalComponent)
  }

  openResetPassDialog(): void {
    this.dialog.open(ResetPasswordModalComponent)
  }

  openChatDialog():void {
    this.dialog.open(ChatModalComponent)
  }

  ngOnDestroy() {
    this.screenSubscribtion.unsubscribe();
  }
}
