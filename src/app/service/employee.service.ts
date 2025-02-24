import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../enviroment/enviroment';
import { Observable, throwError } from "rxjs";

const USER_INFO_ENDPOINT = enviroment.USER_INFO_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {}
  
  
    getLoggedInUserInfo() {
      return this.http.get<any>(`${USER_INFO_ENDPOINT}`);
    }
  
    getEmployeeByemployeeId(): Observable<any> {
      return this.http.get<any>(
        `${enviroment.HOST}/employeeId`
      );
    }
}