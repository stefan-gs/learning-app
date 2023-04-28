import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPassword: FormGroup;

  constructor(private authService: AuthService) {
    this.forgotPassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  resetUserPassword() {
    console.log(this.forgotPassword.value.email);
    const email = this.forgotPassword.value.email;
    this.authService.resetPassword(email)
    .then(()=>{
      console.log('success')
    })
    .catch(error=>{
      console.log(error.message)
    })

  }
}
