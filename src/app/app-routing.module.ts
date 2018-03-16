
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./containers/main/main.component";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./containers/login/login.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {JwttestComponent} from "./components/jwttest/jwttest.component";
import {SessionSetupComponent} from "./components/session-setup/session-setup.component";
import {GameboardComponent} from "./components/gameboard/gameboard.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'test', component: JwttestComponent},
  {path: 'settings', component: SessionSetupComponent},
  {path: 'game', component: GameboardComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
