
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./containers/main/main.component";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./containers/login/login.component";
import {AuthGuardService} from "./guards/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
