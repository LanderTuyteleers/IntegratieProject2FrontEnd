import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SignupFormComponent} from './components/signup-form/signup-form.component';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {FormComponent} from './components/form/form.component';
import {HttpLoginServiceService} from './services/http-login-service.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MainComponent } from './containers/main/main.component';
import { LoginComponent } from './containers/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SessionComponent } from './components/session/session.component';
import {TOKEN_NAME} from './services/auth.constant';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule} from '@angular/http';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import { GameScreenComponent } from './containers/game-screen/game-screen.component';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { GameComponent } from './components/game/game.component';
import { LobbyItemUserComponent } from './components/lobby-item-user/lobby-item-user.component';
import { GameLaneComponent } from './components/game-lane/game-lane.component';
import { CanvasComponent } from './components/canvas/canvas.component';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    NavigationBarComponent,
    LoginFormComponent,
    FormComponent,
    MainComponent,
    LoginComponent,
    ProfileComponent,
    SessionComponent,
    GameScreenComponent,
    LobbyListComponent,
    ChatboxComponent,
    GameComponent,
    LobbyItemUserComponent,
    GameLaneComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthService,
    UserService,
    HttpLoginServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
