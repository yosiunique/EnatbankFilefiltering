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
  ],

  templateUrl: './filefiltering.component.html',
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
  test='';
  isDarkMode:boolean=false;
  isVisible:boolean=false;
  pageSize = 10;
  currentPage = 0;
  paginatedFiles: FileDetails[] = [];
  dataSource = new MatTableDataSource<FileDetails>();
  isVisbleTable = true;

  constructor(private fileService: FileServiceService ,private oauthService:OAuthService) { 

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
    
    this.hideAndDispalyTable();
    if (this.createdDate.startDate <= this.createdDate.endDate) {
      this.fileService.fileList(this.createdDate).subscribe(data => {
        data.sort((a, b) => new Date(a.cdate).getTime() - new Date(b.cdate).getTime());
        this.files = data;
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
        this.filteredFiles = [...this.files];
        this.updatePaginatedFiles();
      },
        (error) => {
          console.log("error stands for", error)
        });
    }
    else {
      this.dateRange = "please Correct your Date rang!";
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
    alert('hi')
    this.oauthService.logOut();
  }

  toggle() {
this.isDarkMode=!this.isDarkMode
document.body.classList.toggle('dark-mode',this.isDarkMode);
  }
  


}




