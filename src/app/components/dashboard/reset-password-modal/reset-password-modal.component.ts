import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmedValidator } from '../../../validators/confirmed.validator'

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css'],
})
export class ResetPasswordModalComponent {
  errorMessage: boolean;

  changePassSuccessMessage: string;
  resetPassErrorMessage : string;

  resetPassword: FormGroup = new FormGroup ({});

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.changePassSuccessMessage = '';
    this.resetPassErrorMessage= '';
    this.errorMessage = false;
    this.resetPassword = fb.group ({ //<---------fix this
      email: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
    });
  }


  get fc(){
    return this.resetPassword.controls;
  }

  updatePassword(): void {
    this.authService.changePassword(this.resetPassword.value)
      .then((result) => {
        this.changePassSuccessMessage = result;
      })
      .catch((error) => {
        this.resetPassErrorMessage = error;
      });
  }

}
