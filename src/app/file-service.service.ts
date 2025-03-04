import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatedDate } from './files/CreatedDate';
import { Observable } from 'rxjs';
import { FileDetails } from './files/FileDetails';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {


  private URL = 'http://localhost:8080/filter-file';
  constructor(private http:HttpClient) { }

/****
 * 
 * fetching file using start and end date
 * 
 */
  fileList(createdDate:CreatedDate):Observable<FileDetails[]> {
    
    return this.http.post<FileDetails[]>(`${this.URL}/search-by-created-date`,createdDate);
  }
 


 /****
  * view file
  */
 getFile(fileName: string) {
 // Encode the filename
  const fileUrl = `http://localhost:8080/filter-file/view/${fileName}`;
  return this.http.get(fileUrl, { responseType: 'blob' });
}

viewFile(fileName:string){

    const url = `http://localhost:8080/filter-file/view/${fileName}`;
    return this.http.get(url, {
      responseType: 'blob' 
    });
  }



}
