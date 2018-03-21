import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./containers/login/login.component";
import {MainComponent} from "./containers/main/main.component";
import {SessionSetupComponent} from "./components/session-setup/session-setup.component";
import {GameScreenComponent} from './containers/game-screen/game-screen.component';

export const router: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'game', component: GameScreenComponent},
  {path: 'settings', component: SessionSetupComponent},
  {path: '**', redirectTo: '/login'}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
