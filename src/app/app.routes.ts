import { Routes } from '@angular/router';
import {SignupContentComponent} from "./loginAndRegistration/pages/signup-content/signup-content.component";
import {LoginContentComponent} from "./loginAndRegistration/pages/login-content/login-content.component";
import {HomeContentComponent} from "./public/pages/home-content/home-content.component";
import {ComunidadComponent} from "./comunidad/comunidad.component";
import {NotauthComponent} from "./notauth/notauth.component";

export const routes: Routes = [
  { path: 'login', component: SignupContentComponent },
  { path: 'signup', component: LoginContentComponent },
  { path : 'community', component: ComunidadComponent},
  { path: 'home', component: HomeContentComponent },
  {path: 'notauth', component: NotauthComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
