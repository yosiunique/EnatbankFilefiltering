import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
// import { AuthService } from './service/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './service/auth.service';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { EmployeeService } from './service/employee.service';
import { authConfig } from './config/authConfig';
import { ProfileComponent } from "./profile/profile/profile.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fileserching';
  
constructor() { 
  
  }

  



}
