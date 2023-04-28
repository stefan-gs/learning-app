import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  firebaseErrorMessage:string;
  isProgressVisible:boolean;
  

  constructor(private authService: AuthService, private router: Router) {

    this.isProgressVisible = false;
    this.firebaseErrorMessage = "";
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
   }
  
    ngOnInit(): void {

      if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
        this.router.navigate(['/dashboard']);
    }
    }

    //login user

    loginUser(): void {

      if(this.loginForm.invalid)
        return;

      this.isProgressVisible = true;

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
          .then((result) => {
            this.isProgressVisible = false;
            if(result == null) {
              
              this.router.navigate(['dashboard'])
            }else if (result.isValid == false) {
              this.firebaseErrorMessage = result.message
            }
          }).catch(error=>{
            console.log(error)
          })

    }

    onLoginWithGoogle() {
      this.authService.GoogleAuth();
    }

}
