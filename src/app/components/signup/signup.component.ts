import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup;
  isProgressVisible: boolean;
  firebaseErrorMessage: string;

  constructor (private router: Router, private authService: AuthService) {

    this.isProgressVisible = false;
    this.firebaseErrorMessage = '';

    this.signUpForm = new FormGroup({
      'email': new FormControl ('', [Validators.required, Validators.email]),
      'name': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  createAccount(){
    if (this.signUpForm.invalid) {

      return;
    }
    this.isProgressVisible = true;
    this.authService.registerUser(this.signUpForm.value)
    .then((result)=> {
        if (result == null) {
          this.router.navigate(['/dashboard']);
        } else if (result.isValid == false) {
          this.firebaseErrorMessage = result.message;
        }
        this.isProgressVisible = false;
    }).catch(error => {
      console.log(error)
    })
  }

}
