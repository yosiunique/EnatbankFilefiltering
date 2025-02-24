import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FilefilteringComponent } from "./kyc/filefiltering/filefiltering.component";
// import { AuthService } from './service/auth.service';
import {   OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { EmployeeService } from './service/employee.service';
import { authConfig } from './config/authConfig';
import { ProfileComponent } from "./profile/profile/profile.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilefilteringComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fileserching';
  employee:any;
  roles:any;
  isLoading:boolean=false;
// constructor(private outhService:OAuthService,private router:Router,private authService:AuthService,private employeeService:EmployeeService) { 
//     this.router.events.subscribe((event) => {
//       const routerEvent = event as RouterEvent;
//       if (routerEvent instanceof NavigationStart) {
//         this.isLoading = true;
//       }

//       if (routerEvent instanceof NavigationEnd) {
//         this.isLoading = false;
//       }
//     });

//     this.init();
//   }

//   public login() {
//       this.outhService.initImplicitFlow();
//     }
  
//     public get userName() {
//       const cliams = this.outhService.getIdentityClaims();
//       if (!cliams) {
//         return null;
//       }
  
//       return (cliams as any).given_name;
//     }
  
//     public get fullName() {
//       return (<any>this.authService.getTokenDetails()).name;
//     }

//   /// security
//   public init() {
//     this.outhService.configure(authConfig);
//    this.outhService.tokenValidationHandler = new JwksValidationHandler();
//     this.outhService.loadDiscoveryDocumentAndLogin().then(() => {
//       this.getRoles();
//       this.getEmployee();
//     });
//     this.outhService.setStorage(localStorage);
//     this.outhService.setupAutomaticSilentRefresh();
//   }


//   getRoles() {
//     this.roles = this.authService.getUserRoles();
  
//   }



//   getEmployee() {
//     this.employeeService
//       .getEmployeeByemployeeId()
//       .subscribe((data:any) => {
        
//         this.employee = data;
//         console.log(this.employee)
        

//  });
//   } 




}
