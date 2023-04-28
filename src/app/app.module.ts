import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { UserModalComponent } from './components/dashboard/user-modal/user-modal.component';
import { QuestionModalComponent } from './components/dashboard/question-modal/question-modal.component';
import { ResetPasswordModalComponent } from './components/dashboard/reset-password-modal/reset-password-modal.component';
import { ChatModalComponent } from './components/dashboard/chat-modal/chat-modal.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials/materials.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';


import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FireServiceService } from './services/fire-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    UserModalComponent,
    QuestionModalComponent,
    ResetPasswordModalComponent,
    ChatModalComponent,
    DashboardMainComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [AuthService, AuthGuard, FireServiceService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
