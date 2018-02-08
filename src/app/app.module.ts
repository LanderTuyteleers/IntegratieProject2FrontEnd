import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {SignupFormComponent} from "./components/signup-form/signup-form.component";
import {FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NavigationBarComponent} from "./components/navigation-bar/navigation-bar.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {FormComponent} from "./components/form/form.component";
import {HttpLoginServiceService} from "./services/http-login-service.service";
import {HttpClientModule} from "@angular/common/http";
import { MainComponent } from './containers/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './containers/login/login.component';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    NavigationBarComponent,
    LoginFormComponent,
    FormComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpLoginServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
