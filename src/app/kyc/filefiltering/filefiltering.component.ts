import { Component, OnInit } from '@angular/core';
import { FileDetails } from '../../files/FileDetails';
import { CreatedDate } from '../../files/CreatedDate';
import { FileServiceService } from '../../file-service.service';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { EmployeeService } from '../../service/employee.service';
import { authConfig } from '../../config/authConfig';


@Component({
  selector: 'app-filefiltering',
  imports: [CommonModule, MatIconModule, FormsModule, MatPaginatorModule,
    MatTableModule,
    MatLabel,
    MatDatepickerModule,
    MatFormField,
    MatToolbarModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSpinner
  ],

  templateUrl:'./filefiltering.component.html',
  styleUrl: './filefiltering.component.css'
})
export class FilefilteringComponent  implements OnInit{

  createdDate: CreatedDate = { startDate: new Date(), endDate: new Date() };
  files: FileDetails[] = [];
  filteredFiles: FileDetails[] = [];
  dateRange: string = ''
  displayedColumns: string[] = ['cdate', 'fileName', 'fileType', 'action'];
  /***
   * 
   * pagination of pagesize exlanation
   * 
  */
  fileUrl:string|undefined;
  fileName:string|null=null;
  test='';
  isDarkMode:boolean=false;
  isVisible:boolean=false;
  pageSize = 10;
  currentPage = 0;
  paginatedFiles: FileDetails[] = [];
  dataSource = new MatTableDataSource<FileDetails>();
  isVisbleTable = true;
  isPriview:boolean=false;
  isDownloading:boolean=false;
  selectedName:string='';
  employee:any;
  roles:any;
  isLoading:boolean=false;
  isTable:boolean=true;

  user:string='';
  branchName:string='';

  constructor(private http:HttpClient,private fileService: FileServiceService ,private oauthService:OAuthService,
    private outhService:OAuthService,private router:Router,private authService:AuthService,private employeeService:EmployeeService
  ) { 

    this.router.events.subscribe((event) => {
      const routerEvent = event as RouterEvent;
      if (routerEvent instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });

    this.init();

  }
  hideAndDispalyTable() {
    this.isVisbleTable = !this.isVisbleTable;
  }

  ngOnInit() {
    this.dateRange = 'please Eneter vaild Date range';
    this.hideAndDispalyTable();
  }
  menuOn(){

    this.isVisible=true;
  }
  menuOf(){
    this.isVisible=false;
  }
  
  filterFiles() {
    this.isTable=false;
    this.hideAndDispalyTable();
    if (this.createdDate.startDate <= this.createdDate.endDate) {
      this.fileService.fileList(this.createdDate).subscribe(data => {
        data.sort((a, b) => new Date(a.cdate).getTime() - new Date(b.cdate).getTime());
        this.files = data;
        this.dataSource = new MatTableDataSource(data);
        this.isTable=true;
        console.log(data);
        this.filteredFiles = [...this.files];
        this.updatePaginatedFiles();
      },
        (error) => {
          console.log("error stands for", error)
          this.isTable=true
        });
    }
    else {
      this.dateRange = "please Correct your Date rang!";
      this.isTable=true
    }

  }

  updatePaginatedFiles() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedFiles = this.filteredFiles.slice(start, end);
    this.paginatedFiles.sort();
  }

  changePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedFiles();
  }




  public onLogOut() {

    this.oauthService.logOut();
  }

  toggle() {
this.isDarkMode=!this.isDarkMode
document.body.classList.toggle('dark-mode',this.isDarkMode);
  }
  
 viewFile(fileName:string){
  this.isPriview=true
  this.selectedName=fileName
  this.fileService.viewFile(fileName).subscribe({
    next:(fileBlob:Blob)=>{
      
      this.fileUrl=URL.createObjectURL(fileBlob);
      console.log(fileBlob);
      const link = document.createElement('a');
      link.href = this.fileUrl;
      link.target = '_blank';  
      link.click();
      this.isPriview=false;
      this.selectedName=''
    },
    error:(error)=>{
console.log("the error is ",error)
 this.isPriview=false;
      this.selectedName=''
    },
 complete:()=>{
 console.log("completed")
  this.isPriview=false;
      this.selectedName=''
 }
    
  })

 }
  


 downloadFile(fileName: string) {
this.isDownloading=true;
this.selectedName=fileName;
  this.fileService.viewFile(fileName).subscribe({
    next: (fileBlob: Blob) => {
      this.fileUrl = URL.createObjectURL(fileBlob);
      console.log(fileBlob);
      const link = document.createElement('a');
      link.href = this.fileUrl;
      link.download = fileName;  
      link.click();  
      this.isDownloading=false;
      this.selectedName=''
    },
    error: (error) => {
      console.log("The error is ", error);
      this.isDownloading=false;
      this.selectedName=''
    },
    complete: () => {
      console.log("Completed");
      this.isDownloading=false;
      this.selectedName=''
    }
  });
}



/*****
 * 
 * fign client services api
 * 
 */

public login() {
  this.outhService.initImplicitFlow();
}

public get userName() {
  const cliams = this.outhService.getIdentityClaims();
  if (!cliams) {
    return null;
  }

  return (cliams as any).given_name;
}

public get fullName() {
  return (<any>this.authService.getTokenDetails()).name;
}

public get branch() {
  return (<any>this.authService.getTokenDetails()).branch;
}
/// security
public init() {
this.outhService.configure(authConfig);
this.outhService.tokenValidationHandler = new JwksValidationHandler();
this.outhService.loadDiscoveryDocumentAndLogin().then(() => {
  this.getRoles();
  this.getEmployee();
});
this.outhService.setStorage(localStorage);
this.outhService.setupAutomaticSilentRefresh();
}


getRoles() {
this.roles = this.authService.getUserRoles();

}



getEmployee() {
this.employeeService
  .getEmployeeByemployeeId()
  .subscribe((data:any) => {
    
    this.employee = data;
    this.user=this.fullName;
    this.branchName=this.branch;
    console.log(this.employee)
    

});
} 



























  

}




