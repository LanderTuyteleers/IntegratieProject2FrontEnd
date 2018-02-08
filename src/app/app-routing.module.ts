
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./containers/main/main.component";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./containers/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
