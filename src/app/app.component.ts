import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SignupContentComponent} from "./loginAndRegistration/pages/signup-content/signup-content.component";
import {AuthService} from "./auth/auth.service";
import { CookieService } from 'ngx-cookie-service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, SignupContentComponent, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isAuthenticated = this.authService.isAuthenticated();
  cookieExists = false;

  ngOnInit():void {
    this.cookieExists=this.cookie.check('user');
    this.autoLogin();
  }
  constructor(private authService:AuthService,private router: Router,private cookie:CookieService) {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }
  autoLogin(){
    if(this.cookieExists){
      this.authService.login(this.cookie.get('email'));
    }
  }
  ingresarPerfil(): void {
    this.router.navigate(['home']); // Redirigir a la página de inicio después del logout
  }
  logout(): void {
    this.authService.logout();
    this.cookie.delete('email')
    this.router.navigate(['login']); // Redirigir a la página de inicio después del logout
  }

}
