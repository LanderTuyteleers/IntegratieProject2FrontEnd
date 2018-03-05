import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {LoginComponent} from "./containers/login/login.component";
import {MainComponent} from "./containers/main/main.component";

export const router: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: '**', redirectTo: '/login'}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
